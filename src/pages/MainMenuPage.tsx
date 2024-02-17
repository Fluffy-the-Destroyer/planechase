import {
	IonButton,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar
} from "@ionic/react";
import {useHistory} from "react-router";

export function MainMenuPage(): React.JSX.Element {
	const history = useHistory();
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar mode="ios">
					<IonTitle>Planechase Proxy App</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div className="ion-text-center">
					<IonButton
						mode="ios"
						onClick={() => history.push("/game/allCards")}
					>
						Play
					</IonButton>
				</div>
			</IonContent>
		</IonPage>
	);
}
