import { type RouterOutputs } from "./api";

export type DesertCharacter =
  | "canele"
  | "eggBread"
  | "macaroon"
  | "pencake"
  | "muffin"
  | "croissant"
  | "fishBread"
  | "mochi";

export const arrayDesertCharacter: Array<DesertCharacter> = [
  "canele",
  "eggBread",
  "macaroon",
  "pencake",
  "muffin",
  "croissant",
  "fishBread",
  "mochi",
];

export type DesertLogOutput = RouterOutputs["desertLog"]["createDesertLog"];
