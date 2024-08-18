import { ColorSpaces } from "chroma-js";

export const MAX_SHADES_NUMBER = 11;

export const SHADES_NAMES = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];

export const COLOR_SPACES: (keyof ColorSpaces | "hex")[] = [
  "hex",
  "hsl",
  "rgb",
  "rgba",
  "lab",
  "lch",
  "oklab",
  "oklch",
];
