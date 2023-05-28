import { type RouterOutputs } from "./api";

export type DesertCharacter =
  | "canele"
  | "eggBread"
  | "macaroon"
  | "pencake"
  | "muffin"
  | "croissant"
  | "fishBread"
  | "mochi"
  | "cookie";

export const arrayDesertCharacter: Array<DesertCharacter> = [
  "canele",
  "eggBread",
  "macaroon",
  "pencake",
  "muffin",
  "croissant",
  "fishBread",
  "mochi",
  "cookie",
];

export const convertName = (charName: DesertCharacter | string) => {
  switch (charName) {
    case "croissant":
      return "크루아상";
    case "eggBread":
      return "계란빵";
    case "macaroon":
      return "마카롱";
    case "muffin":
      return "머핀";
    case "canele":
      return "까눌레";
    case "pencake":
      return "팬케이크";
    case "fishBread":
      return "붕어빵";
    case "mochi":
      return "모찌";
    case "cookie":
      return "쿠키";
    default:
      return charName;
  }
};

export type DesertLogOutput = RouterOutputs["desertLog"]["createDesertLog"];
