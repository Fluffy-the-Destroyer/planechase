import {card, deck} from "./interfaces";

/**Simulates a roll of the planar die
 * @param [chaoticAether=0] How many chaotic aethers are in effect
 * @returns P for a planeswalk, C for chaos, B for blank. If multiple chaoses (due to chaotic aether), returns a string of multiple Cs, e.g. 'CC'
 */
export function rollPlanarDie(chaoticAether: number = 0): string {
	//Generate a number from 0 to 5
	switch (Math.floor(6 * Math.random())) {
		//Planeswalk
		case 0:
			return "P";
		//Chaos (natural)
		case 1:
			return "C";
		//Blank (return chaos if chaotic aether is in effect)
		default:
			return chaoticAether > 0
				? Array(chaoticAether).fill("C").join("")
				: "B";
	}
}

type generator<T = any, U = any, V = void> = (
	this: planarDeck
) => Generator<T, U, V>;

/**A planar deck */
export class planarDeck {
	/**An array containing the cards, in order */
	private planarLibrary: card[] = [];
	/**Tracks the 'top' card */
	private top: number = 0;
	get topCard(): card {
		return this.planarLibrary.at(this.top)!;
	}
	next(this: planarDeck): void {
		this.top++;
		this.top %= this.planarLibrary.length;
	}
	previous(this: planarDeck): void {
		this.top--;
		this.top %= this.planarLibrary.length;
	}
	/**Function(s) to be run on chaos or encountering the phenomenon */
	extraFunction?: generator /*| generator[]*/;
	/**Shuffles the planar deck using a Fisher-Yates shuffle */
	shuffle(this: planarDeck): void {
		/**Card buffer */
		var cardBuffer: card;
		/**Holds random number */
		var r: number;
		for (
			let unshuffled: number = this.planarLibrary.length;
			unshuffled > 1;

		) {
			r = Math.floor(unshuffled * Math.random());
			unshuffled--;
			cardBuffer = this.planarLibrary[r];
			this.planarLibrary[r] = this.planarLibrary[unshuffled];
			this.planarLibrary[unshuffled] = cardBuffer;
		}
	}
	/**Reveals cards from the top of the planar deck (starting from the first non-active card)
	 * @param cards - How many cards to reveal
	 * @param bottom - Whether to put the cards on the bottom, defaults to true
	 * @param order - What order the cards should be in, can be 'same', 'shuffle' or an array of numbers, the order[i]th revealed card will be put ith
	 * @param activeCards - How many cards are already active (face up in the command zone) so should be skipped, defaults to 1
	 * @returns an array containing the revealed cards, in order
	 */
	//revealCards(
	//	cards: number,
	//	bottom: boolean = true,
	//	order: "same" | "shuffle" | number[] = "same",
	//	activeCards: number = 1
	//): card[] {
	//	cards += activeCards;
	//	const revealedCards: card[] = [];
	//	for (let i: number = activeCards; i < cards; i++) {
	//		revealedCards.push(this.planarLibrary[i]);
	//	}
	//}
	/**Planeswalks */
	//planeswalk(this: planarDeck): void {
	//	this.extraFunction = undefined;
	//	this.next();
	//	this.extraFunction =
	//		//@ts-expect-error
	//		planarDeck[this.planarLibrary.at(this.top)!.oracle_id];
	//}
	constructor(cardData: card[], decks: deck[]) {
		this.loadDeck(cardData, decks);
	}
	loadDeck(this: planarDeck, cardData: card[], decks: deck[]): void {
		for (let {cards} of decks) {
			for (let {oracleId, count} of cards) {
				let card = cardData.find(
					({oracle_id}) => oracleId == oracle_id
				);
				if (card == undefined) {
					continue;
				}
				for (let i = 0; i < count; i++) {
					this.planarLibrary.push(card);
				}
			}
		}
		this.shuffle();
	}
	/**Chaotic Aether */
	//private static *"6dc67a65-31bf-4535-9e02-8f6d6ecefde5"(
	//	this: planarDeck
	//): Generator<never, void, void> {}
}

/**Shuffles an array (in place) using a Fisher-Yates shuffle
 * @param array - The array to shuffle
 * @param start - The starting index for the shuffle, defaults to 0
 * @param end - The ending index for the shuffle, defaults to the end of the array
 */
//function shuffle<Type>(
//	array: Type[],
//	start: number = 0,
//	end: number = array.length - 1
//): void {
//	/**Entry buffer */
//	var buffer: Type;
//	/**Holds random number */
//	var r: number;
//	var offset: number = start++;
//	for (let i: number = end + 1; i > start; ) {
//		r = Math.floor((i-- - offset) * Math.random()) + offset;
//		buffer = array[r];
//		array[r] = array[i];
//		array[i] = buffer;
//	}
//}
