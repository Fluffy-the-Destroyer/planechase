import {IonApp, IonRouterOutlet, setupIonicReact} from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/main.css";
import {IonReactRouter} from "@ionic/react-router";
import {Redirect, Route} from "react-router";
import {MainMenuPage} from "./pages/MainMenuPage";
import {DeckEditorPage} from "./pages/DeckEditorPage";
import {GamePage} from "./pages/GamePage";
import {useEffect, useState} from "react";
import {card, deck} from "./functionality/interfaces";
import {getCardData} from "./data/scryfall";
import {getLocalCardData, storeCardData} from "./functionality/localStorage";
import {CardDataContext, DecksContext} from "./functionality/state";

setupIonicReact();
export function App(): React.ReactNode {
  const [cardData, setCardData] = useState<card[]>([]);
  const [deckList, setDeckList] = useState<deck[]>([]);
  useEffect(function () {
    getCardData()
      .then(function (cards) {
        if (cards.length == 0) {
          throw Error("No data returned from scryfall");
        }
        storeCardData(cards).catch(console.error);
        return cards;
      })
      .catch(function (err) {
        console.error(err);
        return getLocalCardData();
      })
      .then(setCardData, console.error);
  }, []);
  useEffect(
    function () {
      if (cardData.length != 0) {
        setDeckList([{name: "allCards", cards: cardData.map(({oracle_id}) => ({oracleId: oracle_id, count: 1}))}]);
      }
    },
    [cardData]
  );
  return (
    <IonApp>
      <CardDataContext.Provider value={cardData}>
        <DecksContext.Provider value={deckList}>
          <IonReactRouter>
            <IonRouterOutlet animated={false}>
              <Route path="/main_menu">
                <MainMenuPage />
              </Route>
              <Route path="/deck_editor">
                <DeckEditorPage />
              </Route>
              <Route path="/game/:deckNames">
                <GamePage />
              </Route>
              <Redirect exact path="/" to="/main_menu" />
            </IonRouterOutlet>
          </IonReactRouter>
        </DecksContext.Provider>
      </CardDataContext.Provider>
    </IonApp>
  );
}
