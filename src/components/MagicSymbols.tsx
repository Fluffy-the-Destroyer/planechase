import $0 from "../symbols/0.svg";
import $1 from "../symbols/1.svg";
import $2 from "../symbols/2.svg";
import $2B from "../symbols/2B.svg";
import $2G from "../symbols/2G.svg";
import $2R from "../symbols/2R.svg";
import $2U from "../symbols/2U.svg";
import $2W from "../symbols/2W.svg";
import $3 from "../symbols/3.svg";
import $4 from "../symbols/4.svg";
import $5 from "../symbols/5.svg";
import $6 from "../symbols/6.svg";
import $7 from "../symbols/7.svg";
import $8 from "../symbols/8.svg";
import $9 from "../symbols/9.svg";
import $10 from "../symbols/10.svg";
import $11 from "../symbols/11.svg";
import $12 from "../symbols/12.svg";
import $13 from "../symbols/13.svg";
import $14 from "../symbols/14.svg";
import $15 from "../symbols/15.svg";
import $16 from "../symbols/16.svg";
import $17 from "../symbols/17.svg";
import $18 from "../symbols/18.svg";
import $19 from "../symbols/19.svg";
import $20 from "../symbols/20.svg";
import $100 from "../symbols/100.svg";
import $1000000 from "../symbols/1000000.svg";
import A from "../symbols/A.svg";
import B from "../symbols/B.svg";
import BG from "../symbols/BG.svg";
import BGP from "../symbols/BGP.svg";
import BP from "../symbols/BP.svg";
import BR from "../symbols/BR.svg";
import BRP from "../symbols/BRP.svg";
import C from "../symbols/C.svg";
import CHAOS from "../symbols/CHAOS.svg";
import E from "../symbols/E.svg";
import G from "../symbols/G.svg";
import GP from "../symbols/GP.svg";
import GU from "../symbols/GU.svg";
import GUP from "../symbols/GUP.svg";
import GW from "../symbols/GW.svg";
import GWP from "../symbols/GWP.svg";
import HALF from "../symbols/HALF.svg";
import HR from "../symbols/HR.svg";
import HW from "../symbols/HW.svg";
import INFINITY from "../symbols/INFINITY.svg";
import P from "../symbols/P.svg";
import PW from "../symbols/PW.svg";
import Q from "../symbols/Q.svg";
import R from "../symbols/R.svg";
import RG from "../symbols/RG.svg";
import RGP from "../symbols/RGP.svg";
import RP from "../symbols/RP.svg";
import RW from "../symbols/RW.svg";
import RWP from "../symbols/RWP.svg";
import S from "../symbols/S.svg";
import T from "../symbols/T.svg";
import TK from "../symbols/TK.svg";
import U from "../symbols/U.svg";
import UB from "../symbols/UB.svg";
import UBP from "../symbols/UBP.svg";
import UP from "../symbols/UP.svg";
import UR from "../symbols/UR.svg";
import URP from "../symbols/URP.svg";
import W from "../symbols/W.svg";
import WB from "../symbols/WB.svg";
import WBP from "../symbols/WBP.svg";
import WP from "../symbols/WP.svg";
import WU from "../symbols/WU.svg";
import WUP from "../symbols/WUP.svg";
import X from "../symbols/X.svg";
import Y from "../symbols/Y.svg";
import Z from "../symbols/Z.svg";
import { IonIcon } from "@ionic/react";

const symbolMap: { [key: string]: string } = Object.create(null);
symbolMap["T"] = T; //Tap
symbolMap["Q"] = Q; //Untap
symbolMap["E"] = E; //Energy
symbolMap["PW"] = PW; //Planeswalk
symbolMap["CHAOS"] = CHAOS; //Chaos
symbolMap["A"] = A; //Acorn counter
symbolMap["TK"] = TK; //Ticket counter
//Generic mana
symbolMap["X"] = X;
symbolMap["Y"] = Y;
symbolMap["Z"] = Z;
symbolMap["0"] = $0;
symbolMap["\u00bd"] = HALF; //Half generic mana (½)
symbolMap["1"] = $1;
symbolMap["2"] = $2;
symbolMap["3"] = $3;
symbolMap["4"] = $4;
symbolMap["5"] = $5;
symbolMap["6"] = $6;
symbolMap["7"] = $7;
symbolMap["8"] = $8;
symbolMap["9"] = $9;
symbolMap["10"] = $10;
symbolMap["11"] = $11;
symbolMap["12"] = $12;
symbolMap["13"] = $13;
symbolMap["14"] = $14;
symbolMap["15"] = $15;
symbolMap["16"] = $16;
symbolMap["17"] = $17;
symbolMap["18"] = $18;
symbolMap["19"] = $19;
symbolMap["20"] = $20;
symbolMap["100"] = $100;
symbolMap["1000000"] = $1000000;
symbolMap["\u221e"] = INFINITY; //Infinite generic mana (∞)
//Hybrid mana
symbolMap["W/U"] = WU; //Azorius
symbolMap["W/B"] = WB; //Orzhov
symbolMap["B/R"] = BR; //Rakdos
symbolMap["B/G"] = BG; //Golgari
symbolMap["U/B"] = UB; //Dimir
symbolMap["U/R"] = UR; //Izzet
symbolMap["R/G"] = RG; //Gruul
symbolMap["R/W"] = RW; //Boros
symbolMap["G/W"] = GW; //Selesnya
symbolMap["G/U"] = GU; //Simic
//Hybrid phyrexian mana
symbolMap["B/G/P"] = BGP; //Golgari
symbolMap["B/R/P"] = BRP; //Rakdos
symbolMap["G/U/P"] = GUP; //Simic
symbolMap["G/W/P"] = GWP; //Selesnya
symbolMap["R/G/P"] = RGP; //Gruul
symbolMap["R/W/P"] = RWP; //Boros
symbolMap["U/B/P"] = UBP; //Dimir
symbolMap["U/R/P"] = URP; //Izzet
symbolMap["W/B/P"] = WBP; //Orzhov
symbolMap["W/U/P"] = WUP; //Azorius
//Twobrid mana
symbolMap["2/W"] = $2W; //White
symbolMap["2/U"] = $2U; //Blue
symbolMap["2/B"] = $2B; //Black
symbolMap["2/R"] = $2R; //Red
symbolMap["2/G"] = $2G; //Green
//Phyrexian mana
symbolMap["P"] = P; //Generic
symbolMap["W/P"] = WP; //White
symbolMap["U/P"] = UP; //Blue
symbolMap["B/P"] = BP; //Black
symbolMap["R/P"] = RP; //Red
symbolMap["G/P"] = GP; //Green
//Half coloured mana
symbolMap["HW"] = HW; //White
symbolMap["HR"] = HR; //Red
//Coloured mana
symbolMap["W"] = W; //White
symbolMap["U"] = U; //Blue
symbolMap["B"] = B; //Black
symbolMap["R"] = R; //Red
symbolMap["G"] = G; //Green
//Other mana
symbolMap["C"] = C; //Colorless
symbolMap["S"] = S; //Snow

const symbolSplitter = /({[A-Z/\d\u00bd\u221e]*})/;
type MagicSymbolsProps = { text: string; keyString: string };
export function MagicSymbols({ text, keyString }: MagicSymbolsProps): React.ReactNode {
  let textArray: string[] = text.split(symbolSplitter);
  let outputArray: React.ReactNode[] = [];
  for (let i = 0; i < textArray.length; i++) {
    if (textArray[i].startsWith("{") && textArray[i].endsWith("}")) {
      outputArray.push(<IonIcon key={`${keyString}Icon${i}`} src={symbolMap[textArray[i].slice(1, -1)]} />);
    } else {
      outputArray.push(<span key={`${keyString}Text${i}`}>{textArray[i]}</span>);
    }
  }
  return outputArray;
}
