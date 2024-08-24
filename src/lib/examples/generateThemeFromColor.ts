import { Color, Palette } from "@/server/types";
import { Theme } from "@/types";
import { generateColorExport } from "../palettes/utils/generateColorExport";

function mapColorShadesToConfig(shadesObject: Record<string, string>, name: string) {
  const shades = Object.entries(shadesObject).reduce(
    (acc, [key, value]) => {
      const newKey = key.replace(`${name}-`, "");
      acc[newKey] = value;

      return acc;
    },
    {} as Record<string, string>,
  );

  if (!shades[950]) {
    throw new Error("Shades object must contain all keys from 50 to 950");
  }

  const radius = "0.5rem";

  return {
    light: {
      radius: "0.5rem",
      background: "0 0% 100%",
      foreground: shades["900"],
      card: "0 0% 100%",
      "card-foreground": shades["900"],
      popover: "0 0% 100%",
      "popover-foreground": shades["900"],
      primary: shades["800"],
      "primary-foreground": "0 0% 100%",
      secondary: shades["200"],
      "secondary-foreground": shades["800"],
      muted: shades["100"],
      "muted-foreground": shades["600"],
      accent: shades["100"],
      "accent-foreground": shades["800"],
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "0 0% 100%",
      border: shades["100"],
      input: shades["200"],
      ring: shades["700"],
      "chart-1": "12 76% 61%",
      "chart-2": "173 58% 39%",
      "chart-3": "197 37% 24%",
      "chart-4": "43 74% 66%",
      "chart-5": "27 87% 67%",
    },
    dark: {
      radius: "0.5rem",
      background: "240 10% 3.9%",
      foreground: shades["50"],
      card: "240 10% 3.9%",
      "card-foreground": shades["50"],
      popover: "240 10% 3.9%",
      "popover-foreground": shades["50"],
      primary: shades["200"],
      "primary-foreground": "240 10% 3.9%",
      secondary: shades["700"],
      "secondary-foreground": shades["50"],
      muted: shades["800"],
      "muted-foreground": shades["300"],
      accent: shades["700"],
      "accent-foreground": shades["50"],
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "0 0% 100%",
      border: shades["950"],
      input: shades["700"],
      ring: shades["300"],
      "chart-1": "220 70% 50%",
      "chart-2": "160 60% 45%",
      "chart-3": "30 80% 55%",
      "chart-4": "280 65% 60%",
      "chart-5": "340 75% 55%",
    },
  };
}

export const generateThemeFromColor = (color: Color): Theme => {
  const hslFormattedShades = generateColorExport(color, "json", "hsl", false);
  const shadesObject = JSON.parse(hslFormattedShades);

  return {
    name: color.name,
    label: color.name,
    cssVars: mapColorShadesToConfig(shadesObject, color.name),
  };
};
