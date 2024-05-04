import {IonButton, IonIcon, IonItem, IonList} from "@ionic/react";
import {refresh} from "ionicons/icons";
import {fn} from "../functionality/interfaces";

type GameOptionsProps = {shuffle: fn};
export function GameOptions({shuffle}: GameOptionsProps): React.ReactNode {
  return (
    <IonList>
      <IonItem>
        Shuffle
        <IonButton slot="end" onClick={shuffle} className="text-white">
          <IonIcon icon={refresh} />
        </IonButton>
      </IonItem>
    </IonList>
  );
}
