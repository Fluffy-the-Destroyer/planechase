import {Preferences} from "@capacitor/preferences";
import {card, deck} from "./interfaces";
import {
	multiQueueHandlerFactory,
	multiRequestHandlerFactory,
	queueHandlerFactory,
	requestHandlerFactory
} from "./utility";

const storageKeys = {
	cards: "cardData",
	deckNames: "storedDeckNames",
	allCards: ""
};

export const storeCardData = queueHandlerFactory(function storeCardDataInternal(
	cards: card[]
): Promise<void> {
	return Preferences.set({
		key: storageKeys.cards,
		value: JSON.stringify(cards)
	});
});

export const getLocalCardData = requestHandlerFactory(
	async function getLocalCardDataInternal(): Promise<card[]> {
		return JSON.parse(
			(await Preferences.get({key: storageKeys.cards})).value ?? "[]"
		);
	}
);

const addSavedDeckName = queueHandlerFactory(
	async function addSavedDeckNameInternal(name: string): Promise<void> {
		await Preferences.set({
			key: storageKeys.deckNames,
			value: JSON.stringify(
				Array.from(
					new Set<string>(
						JSON.parse(
							(
								await Preferences.get({
									key: storageKeys.deckNames
								})
							).value ?? "[]"
						)
					).add(name)
				)
			)
		});
	}
);

const removeStoredDeckName = queueHandlerFactory(
	async function removeStoredDeckNameInternal(name: string): Promise<void> {
		await Preferences.set({
			key: storageKeys.deckNames,
			value: JSON.stringify(
				JSON.parse(
					(
						await Preferences.get({key: storageKeys.deckNames})
					).value ?? "[]"
				).filter((val: string) => val != name)
			)
		});
	}
);

export const getStoredDeckNames = requestHandlerFactory(
	async function getStoredDeckNamesInternal(): Promise<string[]> {
		return JSON.parse(
			(await Preferences.get({key: storageKeys.deckNames})).value ?? "[]"
		);
	}
);

export const saveDeck = multiQueueHandlerFactory(
	async function saveDeckInternal(deck: deck): Promise<void> {
		if (Object.hasOwn(storageKeys, deck.name)) {
			throw Error(`${deck.name} is not valid as a deck name`);
		}
		await Promise.all([
			addSavedDeckName(deck.name),
			Preferences.set({key: deck.name, value: JSON.stringify(deck.cards)})
		]);
	},
	({name}) => name
);

export const deleteSavedDeck = multiRequestHandlerFactory(
	async function deleteSavedDeckInternal(name: string): Promise<void> {
		if (Object.hasOwn(storageKeys, name)) {
			throw Error(`${name} is not valid as a deck name`);
		}
		await Promise.all([
			removeStoredDeckName(name),
			Preferences.remove({key: name})
		]);
	},
	(name) => name
);

export const getSavedDeck = multiQueueHandlerFactory(
	async function getSavedDeckInternal(name: string): Promise<deck> {
		if (!(await getStoredDeckNames()).includes(name)) {
			throw Error(`Deck '${name}' not found`);
		}
		return {
			name,
			cards: JSON.parse(
				(await Preferences.get({key: name})).value ?? "[]"
			)
		};
	},
	(name) => name
);
