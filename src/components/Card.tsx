import { card } from "../functionality/interfaces";
import { RulesText } from "./RulesText";
import { Fragment } from "react";

type CardProps = { card: card };
export function Card({ card }: CardProps): React.ReactNode {
  //console.log(card);
  return (
    <Fragment>
      <div className="ion-padding">{card?.isPlane ? `Plane \u2014 ${card?.subtype}` : "Phenomenon"}</div>
      <div className="ion-padding">
        <RulesText text={card.mainEffects} keyString={`${card.oracle_id}Main`} />
      </div>
      {card?.isPlane ? (
        <div className="ion-padding">
          <RulesText text={card.chaosEffect} keyString={`${card.oracle_id}Chaos`} />
        </div>
      ) : null}
    </Fragment>
  );
}
