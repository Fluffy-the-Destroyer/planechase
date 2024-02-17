import {Fragment} from "react";
import {MagicSymbols} from "./MagicSymbols";

type RulesTextProps = {text: string; keyString: string};
export function RulesText({
	text,
	keyString
}: RulesTextProps): React.JSX.Element {
	var startIndex: number = text.indexOf("(") + 1;
	var endIndex: number = 0;
	var textArray: React.JSX.Element[] = [];
	while (startIndex >= 1) {
		textArray.push(
			<span key={`${keyString}Rules${endIndex}`}>
				<MagicSymbols
					keyString={`${keyString}Rules${endIndex}`}
					text={text.substring(endIndex, startIndex)}
				/>
			</span>
		);
		endIndex = text.indexOf(")", startIndex);
		textArray.push(
			<span className="italics" key={`${keyString}Reminder${endIndex}`}>
				<MagicSymbols
					keyString={`${keyString}Reminder${endIndex}`}
					text={text.substring(startIndex, endIndex)}
				/>
			</span>
		);
		startIndex = text.indexOf("(", endIndex) + 1;
	}
	textArray.push(
		<span key={`${keyString}Rules${endIndex}`}>
			<MagicSymbols
				keyString={`${keyString}Rules${endIndex}`}
				text={text.substring(endIndex)}
			/>
		</span>
	);
	return <Fragment>{textArray}</Fragment>;
}
