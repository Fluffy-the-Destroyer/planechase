export function requestHandlerFactory<returnType>(
	fn: () => Promise<returnType>
): () => Promise<returnType> {
	var buff: Promise<returnType> | null;
	return function requestHandler(): Promise<returnType> {
		return (buff ??= new Promise<returnType>((fulfill, reject) =>
			fn()
				.then(fulfill, reject)
				.finally(() => void (buff = null))
		));
	};
}

export function multiRequestHandlerFactory<T extends any[], U>(
	fn: (...args: T) => Promise<U>,
	hash: (...args: T) => any
): (...args: T) => Promise<U> {
	var dataMap: Map<any, Promise<U>> = new Map();
	return function multiRequestHandler(...args: T): Promise<U> {
		let argHash = hash(...args);
		let mapVal = dataMap.get(argHash);
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

async function* queue<T extends any[], U>(
	fn: (...args: T) => Promise<U>
): AsyncGenerator<PromiseSettledResult<U>, never, T> {
	var res: PromiseSettledResult<U>;
	while (true) {
		try {
			res = {status: "fulfilled", value: await fn(...(yield res!))};
		} catch (err) {
			res = {status: "rejected", reason: err};
		}
	}
}
export function queueHandlerFactory<T extends any[], U>(
	fn: (...args: T) => Promise<U>
): (...args: T) => Promise<U> {
	var it = queue(fn);
	it.next();
	return async function queueHandler(...args: T): Promise<U> {
		let res: PromiseSettledResult<U> = (await it.next(args)).value;
		if (res.status == "fulfilled") {
			return res.value;
		}
		throw res.reason;
	};
}

export function multiQueueHandlerFactory<T extends any[], U>(
	fn: (...args: T) => Promise<U>,
	hash: (...args: T) => any
): (...args: T) => Promise<U> {
	var queueMap: Map<
		any,
		{it: AsyncGenerator<PromiseSettledResult<U>, never, T>; count: number}
	> = new Map();
	return function multiQueueHandler(...args: T): Promise<U> {
		let argHash = hash(...args);
		let mapVal = queueMap.get(argHash);
		if (mapVal == undefined) {
			mapVal = {it: queue(fn), count: 0};
			mapVal.it.next();
			queueMap.set(argHash, mapVal);
		}
		mapVal.count++;
		return new Promise<U>((fulfill, reject) =>
			mapVal!.it.next(args).then(function ({value: res}) {
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
