import {Card, Cards} from "scryfall-sdk";
import {card} from "../functionality/interfaces";
import {requestHandlerFactory} from "../functionality/utility";

export const getCardData = requestHandlerFactory(
	function getCardDataInternal(): Promise<card[]> {
		var cards: card[] = [];
		return new Promise<card[]>(function (fulfill, reject) {
			Cards.search("t:plane or t:phenomenon", {unique: "cards"})
				.on("data", (Card) => cards.push(processCard(Card)))
				.on("end", () => fulfill(cards))
				.on("error", reject);
		});
	}
);
function processCard(Card: Card): card {
	var {isPlane, subtype}: typeLine = processTypeLine(Card.type_line);
	var {
		mainEffects,
		chaosEffect
	}: {mainEffects: string; chaosEffect?: string} = processCardText(
		Card.oracle_text
	);
	var card: any = {
		oracle_id: Card.oracle_id,
		name: Card.name,
		image: Card.image_uris?.png,
		isPlane,
		mainEffects
	};
	if (isPlane) {
		card.chaosEffect = chaosEffect;
		card.subtype = subtype;
	}
	return card;
}
function processTypeLine(typeLine: string): typeLine {
	var [type, subtype]: string[] = typeLine
		.split("\u2014")
		.map((val) => val.trim());
	return type == "Plane" ? {isPlane: true, subtype} : {isPlane: false};
}
const chaosSplitter =
	/\n((?:Praise Him|Red-Eye|Will of the council) \u2014 )?((?:When|Whenever) chaos ensues,)/;
function processCardText(text?: string | null): {
	mainEffects: string;
	chaosEffect?: string;
} {
	if (text == undefined) {
		return {
			mainEffects: ""
		};
	}
	var [mainEffects, ...chaosEffectArr] = text.split(chaosSplitter);
	if (chaosEffectArr.length != 0) {
		var chaosEffect: string | undefined = chaosEffectArr.join("");
	}
	return {
		mainEffects,
		chaosEffect
	};
}

type typeLine =
	| {
			isPlane: true;
			subtype: string;
	  }
	| {isPlane: false; subtype?: undefined};
