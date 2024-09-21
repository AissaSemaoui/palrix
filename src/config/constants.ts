import { themes } from "@/lib/examples/themes";
import { ThemeVariables } from "@/types";
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

export const CSS_VARS_NAMES: (keyof ThemeVariables)[] = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
];

export const DEFAULT_THEME = themes[0];

export const MAPPER_THEME = "custom";
