import { DEFAULT_THEME, MAPPER_THEME } from "@/config/constants";
import { Color, Palette } from "@/server/types";
import { Theme, ThemeMapping, ThemeMappingItem, ThemeMode, ThemeVariables } from "@/types";
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

  return {
    light: {
      background: "0 0% 100%",
      foreground: shades["900"],
      card: "0 0% 100%",
      "card-foreground": shades["900"],
      popover: "0 0% 100%",
      "popover-foreground": shades["900"],
      primary: shades["700"],
      "primary-foreground": "0 0% 100%",
      secondary: shades["200"],
      "secondary-foreground": shades["800"],
      muted: shades["100"],
      "muted-foreground": shades["600"],
      accent: shades["100"],
      "accent-foreground": shades["800"],
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "0 0% 100%",
      border: "240 5.9% 90%",
      input: shades["100"],
      ring: shades["700"],
      "chart-1": "12 76% 61%",
      "chart-2": "173 58% 39%",
      "chart-3": "197 37% 24%",
      "chart-4": "43 74% 66%",
      "chart-5": "27 87% 67%",
    },
    dark: {
      background: "240 10% 3.9%",
      foreground: shades["50"],
      card: "240 10% 3.9%",
      "card-foreground": shades["50"],
      popover: "240 10% 3.9%",
      "popover-foreground": shades["50"],
      primary: shades["400"],
      "primary-foreground": "240 10% 3.9%",
      secondary: shades["800"],
      "secondary-foreground": shades["50"],
      muted: shades["900"],
      "muted-foreground": shades["400"],
      accent: shades["800"],
      "accent-foreground": shades["50"],
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "0 0% 100%",
      border: "240 3.7% 15.9%",
      input: shades["900"],
      ring: shades["400"],
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

export const generateThemeFromMapping = (palette: Palette, themeMapping: ThemeMapping): Theme => {
  const generateThemeMode = (mode: ThemeMode): Record<keyof ThemeVariables, string> => {
    const result: Partial<Record<keyof ThemeVariables, string>> = {};

    for (const themeEntry of Object.entries(themeMapping[mode])) {
      const cssVar = themeEntry[0] as keyof ThemeVariables;
      const mapping: ThemeMappingItem = themeEntry[1];

      const color = palette.colors[mapping.paletteIndex];
      if (!color) {
        result[cssVar] = DEFAULT_THEME.cssVars[mode][cssVar];
        continue;
      }

      const hslFormattedShades = JSON.parse(generateColorExport(color, "json", "hsl", false));
      const shadeKey = Object.keys(hslFormattedShades)[mapping.shadeIndex];
      result[cssVar] = hslFormattedShades[shadeKey];
    }

    return result as Record<keyof ThemeVariables, string>;
  };

  return {
    name: MAPPER_THEME,
    label: MAPPER_THEME,
    cssVars: {
      light: generateThemeMode("light"),
      dark: generateThemeMode("dark"),
    },
  };
};
