import {IonButton, IonIcon, IonItem, IonList} from "@ionic/react";
import {refresh} from "ionicons/icons";

type GameOptionsProps = {shuffle: () => void};
export function GameOptions({shuffle}: GameOptionsProps): React.JSX.Element {
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
