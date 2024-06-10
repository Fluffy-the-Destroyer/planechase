import { asyncFn, fn } from "./interfaces";

export function requestHandlerFactory<T>(fn: asyncFn<[], T>): asyncFn<[], T> {
  let buff: Promise<T> | null;
  return function requestHandler(): Promise<T> {
    return (buff ??= new Promise<T>((fulfill, reject) =>
      fn()
        .then(fulfill, reject)
        .finally(() => (buff = null))
    ));
  };
}

export function multiRequestHandlerFactory<T extends any[], U>(fn: asyncFn<T, U>, hash: fn<T, any>): asyncFn<T, U> {
  let dataMap = new Map<any, Promise<U>>();
  return function multiRequestHandler(...args: T): Promise<U> {
    let argHash = hash(...args);
    let mapVal: Promise<U> | undefined = dataMap.get(argHash);
    if (mapVal == undefined) {
      mapVal = new Promise<U>((fulfill, reject) =>
        fn(...args)
          .then(fulfill, reject)
          .finally(() => dataMap.delete(argHash))
      );
      dataMap.set(argHash, mapVal);
    }
    return mapVal;
  };
}

async function* queue<T extends any[], U>(fn: asyncFn<T, U>): AsyncGenerator<PromiseSettledResult<U>, never, T> {
  let res: PromiseSettledResult<U>;
  while (true) {
    try {
      res = { status: "fulfilled", value: await fn(...(yield res!)) };
    } catch (err) {
      res = { status: "rejected", reason: err };
    }
  }
}
export function queueHandlerFactory<T extends any[], U>(fn: asyncFn<T, U>): asyncFn<T, U> {
  let it = queue(fn);
  void it.next();
  return async function queueHandler(...args: T): Promise<U> {
    let res: PromiseSettledResult<U> = (await it.next(args)).value;
    if (res.status == "fulfilled") {
      return res.value;
    }
    throw res.reason;
  };
}

export function multiQueueHandlerFactory<T extends any[], U>(fn: asyncFn<T, U>, hash: fn<T, any>): asyncFn<T, U> {
  let queueMap: Map<any, { it: AsyncGenerator<PromiseSettledResult<U>, never, T>; count: number }> = new Map();
  return function multiQueueHandler(...args: T): Promise<U> {
    let argHash = hash(...args);
    let mapVal = queueMap.get(argHash);
    if (mapVal == undefined) {
      mapVal = { it: queue(fn), count: 0 };
      void mapVal.it.next();
      queueMap.set(argHash, mapVal);
    }
    mapVal.count++;
    return new Promise<U>((fulfill, reject) =>
      mapVal!.it.next(args).then(function ({ value: res }) {
        if (res.status == "fulfilled") {
          fulfill(res.value);
        } else {
          reject(res.reason);
        }
        if (--mapVal!.count == 0) {
          queueMap.delete(argHash);
        }
      })
    );
  };
}
