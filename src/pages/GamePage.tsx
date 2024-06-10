import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { settings } from "ionicons/icons";
import { Fragment, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { card, deck } from "../functionality/interfaces";
import { CardDataContext, DecksContext } from "../functionality/state";
import { planarDeck } from "../functionality/functionality";
import { Card } from "../components/Card";
import { PlanarDeckControls } from "../components/PlanarDeckControls";
import { Modal } from "../components/Modal";
import { GameOptions } from "../components/GameOptions";

export function GamePage(): React.ReactNode {
  const location = useLocation();
  let deckNames: string[] = location.pathname.split("/")[2]?.split(",").map(decodeURIComponent);
  const cardData = useContext<card[]>(CardDataContext);
  const deckList = useContext<deck[]>(DecksContext);
  const [deck] = useState<planarDeck>(function () {
    let decks: deck[] = [];
    for (let i = 0; i < deckNames?.length; i++) {
      let deck = deckList.find(({ name }) => name == deckNames[i]);
      if (deck != undefined) {
        decks.push(deck);
      }
    }
    return new planarDeck(cardData, decks);
  });
  const [card, setCard] = useState<card>(deck.topCard);
  const [textModalOpen, setTextModalOpen] = useState<boolean>(false);
  const [textFallback, setTextFallback] = useState<boolean>(false);
  useEffect(() => setTextFallback(false), [card]);
  const [scaleFactor, setScaleFactor] = useState<number>(() =>
    Math.min((window.innerHeight * 0.7) / 1040, window.innerWidth / 1490)
  );
  const [translation, setTranslation] = useState<number>(() => (1490 * scaleFactor + window.innerWidth) / 2);
  useEffect(function () {
    window.addEventListener("resize", windowResizeHandler);
    return () => window.removeEventListener("resize", windowResizeHandler);
    function windowResizeHandler() {
      let newScaleFactor: number = Math.min((window.innerHeight * 0.7) / 1040, window.innerWidth / 1490);
      setScaleFactor(newScaleFactor);
      setTranslation((1490 * newScaleFactor + window.innerWidth) / 2);
    }
  }, []);
  const [optionsModalOpen, setOptionsModalOpen] = useState<boolean>(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode="ios">
          <IonButtons slot="start">
            <IonBackButton mode="md" defaultHref="/main_menu" />
          </IonButtons>
          <IonTitle>{card?.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton className="white-text" onClick={() => setOptionsModalOpen(true)}>
              <IonIcon icon={settings} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {card == undefined ? (
        <IonContent className="ion-padding ion-text-center">Error: deck contains no cards</IonContent>
      ) : (
        <Fragment>
          {textFallback ? (
            <Card card={card} />
          ) : (
            <div style={{ maxHeight: `${window.innerHeight * 0.7}px`, maxWidth: `${window.innerWidth}px` }}>
              <img
                style={{
                  maxHeight: "none",
                  maxWidth: "none",
                  transformOrigin: "top left",
                  transform: `translate(${translation}px) scale(${scaleFactor}) rotate(90deg)`,
                }}
                src={card.image}
                onError={() => setTextFallback(true)}
              />
            </div>
          )}
          <PlanarDeckControls deck={deck} setCard={setCard} setTextModalOpen={setTextModalOpen} />
        </Fragment>
      )}
      <IonModal isOpen={textModalOpen} onDidDismiss={() => setTextModalOpen(false)}>
        <Modal title={card?.name} closeFn={() => setTextModalOpen(false)}>
          <Card card={card} />
        </Modal>
      </IonModal>
      <IonModal isOpen={optionsModalOpen} backdropDismiss={false}>
        <Modal title="Options" closeFn={() => setOptionsModalOpen(false)}>
          <GameOptions shuffle={() => deck.shuffle()} />
        </Modal>
      </IonModal>
    </IonPage>
  );
}
