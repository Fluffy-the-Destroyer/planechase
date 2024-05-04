import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import {useContext} from "react";
import {useHistory} from "react-router";
import {card} from "../functionality/interfaces";
import {CardDataContext} from "../functionality/state";

export function MainMenuPage(): React.ReactNode {
  const history = useHistory();
  const cardData = useContext<card[]>(CardDataContext);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode="ios">
          <IonTitle>Planechase Proxy App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-text-center">
          <IonButton mode="ios" onClick={() => history.push("/game/allCards")} disabled={cardData.length == 0}>
            Play
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}
