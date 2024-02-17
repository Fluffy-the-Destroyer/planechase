import {createContext} from "react";
import {card, deck} from "./interfaces";

export const CardDataContext = createContext<card[]>([]);

export const DecksContext = createContext<deck[]>([]);
