import {Ruling} from "scryfall-sdk";

/**A plane or phenomenon card */
export type card = plane | phenomenon;

/**A plane or phenomenon card (for internals) */
interface planarCard {
	/**Card identifier */
	oracle_id: string;
	/**Card name */
	name: string;
	/**Rulings */
	rulings?: Ruling[];
	/**Link to image */
	image?: string;
}

/**A plane card */
export interface plane extends planarCard {
	/**Is it a plane */
	isPlane: true;
	/**Non-chaos effects */
	mainEffects: string;
	/**Chaos effect */
	chaosEffect: string;
	/**Subtype */
	subtype: string;
}

/**A phenomenon card */
export interface phenomenon extends planarCard {
	/**Is it a plane */
	isPlane: false;
	/**Effects */
	mainEffects: string;
}

export type deck = {
	name: string;
	cards: {oracleId: string; count: number}[];
};
