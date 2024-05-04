import {IonAlert, IonButton} from "@ionic/react";
import {planarDeck, rollPlanarDie} from "../functionality/functionality";
import {card, fn} from "../functionality/interfaces";
import {useState} from "react";

type PlanarDeckControlsProps = {deck: planarDeck; setCard: fn<[card]>; setTextModalOpen: fn<[boolean]>};
export function PlanarDeckControls({deck, setCard, setTextModalOpen}: PlanarDeckControlsProps): React.ReactNode {
  const [dieResult, setDieResult] = useState<string>("");
  const [resultModalOpen, setResultModalOpen] = useState<boolean>(false);
  return (
    <div className="planarDeckControlsContainer ion-padding ion-text-center">
      <IonButton mode="ios" onClick={() => setTextModalOpen(true)} className="ion-margin">
        Show Oracle Text
      </IonButton>
      <IonButton
        mode="ios"
        onClick={function () {
          deck.previous();
          setCard(deck.topCard);
        }}
        className="ion-margin"
      >
        Previous
      </IonButton>
      <IonButton
        mode="ios"
        onClick={function () {
          deck.next();
          setCard(deck.topCard);
        }}
        className="ion-margin"
      >
        Next
      </IonButton>
      <IonButton
        mode="ios"
        onClick={function () {
          let result: string = rollPlanarDie();
          switch (result[0]) {
            case "P":
              setDieResult("Planeswalk");
              break;
            case "B":
              setDieResult("Blank");
              break;
            case "C":
              setDieResult(`Chaos${result.length > 1 ? ` (x${result.length})` : ""}`);
          }
          setResultModalOpen(true);
        }}
        className="ion-margin"
      >
        Roll Planar Die
      </IonButton>
      <IonAlert
        mode="ios"
        isOpen={resultModalOpen}
        header={dieResult}
        buttons={["Ok"]}
        onDidDismiss={() => setResultModalOpen(false)}
      />
    </div>
  );
}
