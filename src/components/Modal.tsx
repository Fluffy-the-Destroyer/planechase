import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonPage,
	IonTitle,
	IonToolbar
} from "@ionic/react";
import {close} from "ionicons/icons";

type ModalProps = {
	closeFn: () => unknown;
	title?: string;
	children?: React.JSX.Element;
};
export function Modal({
	closeFn,
	title,
	children
}: ModalProps): React.JSX.Element {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar mode="ios">
					<IonButtons slot="start">
						<IonButton onClick={closeFn} className="white-text">
							<IonIcon icon={close} />
						</IonButton>
					</IonButtons>
					<IonTitle>{title}</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>{children}</IonContent>
		</IonPage>
	);
}
