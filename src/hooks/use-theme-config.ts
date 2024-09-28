import { DEFAULT_THEME } from "@/config/constants";
import { themes } from "@/lib/examples/themes";
import { Palette } from "@/server/types";
import { Theme, ThemeConfig, ThemeMapping, ThemeMappingItem, ThemeMode, ThemeVariables } from "@/types";
import { create } from "zustand";
import { generateThemeFromColor } from "../lib/examples/generateThemeFromColor";

type UseThemeCustomizer = {
  themeConfig: ThemeConfig;
  setThemeConfig: (theme: Partial<ThemeConfig>) => void;
  themeMapping: ThemeMapping;
  updateThemeMapping: (cssVar: keyof ThemeVariables, value: ThemeMappingItem, themeMode: ThemeMode) => void;
  themes: Theme[];
  upsertTheme: (newTheme: Theme) => void;
  generateThemes: (palette: Palette) => void;
};

const config = {
  style: "default",
  theme: "red",
  radius: 0.5,
};

const defaultThemeMapping: ThemeMapping = {
  light: {
    background: { paletteIndex: 0, shadeIndex: 0 }, // White
    foreground: { paletteIndex: 0, shadeIndex: 9 }, // Neutral-900
    card: { paletteIndex: 0, shadeIndex: 0 }, // White
    "card-foreground": { paletteIndex: 0, shadeIndex: 9 }, // Neutral-900
    popover: { paletteIndex: 0, shadeIndex: 0 }, // White
    "popover-foreground": { paletteIndex: 0, shadeIndex: 9 }, // Neutral-900
    primary: { paletteIndex: 1, shadeIndex: 6 }, // Primary-600
    "primary-foreground": { paletteIndex: 1, shadeIndex: 0 }, // Primary-50
    secondary: { paletteIndex: 2, shadeIndex: 6 }, // Secondary-600
    "secondary-foreground": { paletteIndex: 2, shadeIndex: 0 }, // Secondary-50
    muted: { paletteIndex: 0, shadeIndex: 2 }, // Neutral-200
    "muted-foreground": { paletteIndex: 0, shadeIndex: 6 }, // Neutral-600
    accent: { paletteIndex: 4, shadeIndex: 6 }, // Accent-600
    "accent-foreground": { paletteIndex: 4, shadeIndex: 0 }, // Accent-50
    destructive: { paletteIndex: 0, shadeIndex: 6 }, // Neutral-600
    "destructive-foreground": { paletteIndex: 0, shadeIndex: 0 }, // Neutral-50
    border: { paletteIndex: 0, shadeIndex: 3 }, // Neutral-300
    input: { paletteIndex: 0, shadeIndex: 3 }, // Neutral-300
    ring: { paletteIndex: 1, shadeIndex: 6 }, // Primary-600
    "chart-1": { paletteIndex: 1, shadeIndex: 6 }, // Primary-600
    "chart-2": { paletteIndex: 2, shadeIndex: 6 }, // Secondary-600
    "chart-3": { paletteIndex: 3, shadeIndex: 6 }, // Tertiary-600
    "chart-4": { paletteIndex: 4, shadeIndex: 6 }, // Accent-600
    "chart-5": { paletteIndex: 0, shadeIndex: 6 }, // Neutral-600
  },
  dark: {
    background: { paletteIndex: 0, shadeIndex: 9 }, // Neutral-900
    foreground: { paletteIndex: 0, shadeIndex: 1 }, // Neutral-100
    card: { paletteIndex: 0, shadeIndex: 8 }, // Neutral-800
    "card-foreground": { paletteIndex: 0, shadeIndex: 1 }, // Neutral-100
    popover: { paletteIndex: 0, shadeIndex: 8 }, // Neutral-800
    "popover-foreground": { paletteIndex: 0, shadeIndex: 1 }, // Neutral-100
    primary: { paletteIndex: 1, shadeIndex: 5 }, // Primary-500
    "primary-foreground": { paletteIndex: 1, shadeIndex: 0 }, // Primary-50
    secondary: { paletteIndex: 2, shadeIndex: 5 }, // Secondary-500
    "secondary-foreground": { paletteIndex: 2, shadeIndex: 0 }, // Secondary-50
    muted: { paletteIndex: 0, shadeIndex: 7 }, // Neutral-700
    "muted-foreground": { paletteIndex: 0, shadeIndex: 4 }, // Neutral-400
    accent: { paletteIndex: 4, shadeIndex: 5 }, // Accent-500
    "accent-foreground": { paletteIndex: 4, shadeIndex: 0 }, // Accent-50
    destructive: { paletteIndex: 0, shadeIndex: 5 }, // Neutral-500
    "destructive-foreground": { paletteIndex: 0, shadeIndex: 0 }, // Neutral-50
    border: { paletteIndex: 0, shadeIndex: 6 }, // Neutral-600
    input: { paletteIndex: 0, shadeIndex: 6 }, // Neutral-600
    ring: { paletteIndex: 1, shadeIndex: 5 }, // Primary-500
    "chart-1": { paletteIndex: 1, shadeIndex: 5 }, // Primary-500
    "chart-2": { paletteIndex: 2, shadeIndex: 5 }, // Secondary-500
    "chart-3": { paletteIndex: 3, shadeIndex: 5 }, // Tertiary-500
    "chart-4": { paletteIndex: 4, shadeIndex: 5 }, // Accent-500
    "chart-5": { paletteIndex: 0, shadeIndex: 5 }, // Neutral-500
  },
};

export const useThemeCustomizer = create<UseThemeCustomizer>((set) => ({
  themeConfig: config,
  setThemeConfig: (theme) =>
    set((state) => ({
      themeConfig: { ...state.themeConfig, ...theme },
    })),
  themeMapping: defaultThemeMapping,
  updateThemeMapping: (cssVar, value, themeMode) => {
    set((state) => ({
      themeMapping: {
        ...state.themeMapping,
        [themeMode]: {
          ...state.themeMapping[themeMode],
          [cssVar]: value,
        },
      },
    }));
  },
  upsertTheme: (newTheme) => {
    set((state) => {
      const themeIndex = state.themes.findIndex((t) => t.name === newTheme.name);
      const themes = [...state.themes];

      if (themeIndex === -1) {
        themes.push(newTheme);
      } else {
        themes[themeIndex] = newTheme;
      }

      return {
        themes,
      };
    });
  },

  themes: themes,
  generateThemes: (palette) => set({ themes: palette.colors.map(generateThemeFromColor) }),
}));

// let themeCustomizerInit = false;
// useThemeCustomizer.subscribe((state, prevState) => {
//   if (state.themeMapping !== prevState.themeMapping || !themeCustomizerInit) {
//     const selectedPalette = usePlayground.getState().selectedPalette;
//     themeCustomizerInit = true;

//     if (!selectedPalette) return;

//     state.upsertTheme(generateThemeFromMapping(selectedPalette, state.themeMapping));
//   }
// });

// let playgroundInit = false;
// usePlayground.subscribe((state, prevState) => {
//   if (state.selectedPalette !== prevState.selectedPalette || !playgroundInit) {
//     if (!state.selectedPalette) return;

//     console.log("did it generate themes : ", state.selectedPalette);

//     useThemeCustomizer.getState().generateThemes(state.selectedPalette);
//   }
//   playgroundInit = true;
//   console.log(state, prevState);
// });

export const useThemeConfig = () => useThemeCustomizer((state) => state.themeConfig);

export const useSelectedCustomizerTheme = () =>
  useThemeCustomizer((state) => {
    console.log(state.themeConfig, state.themes);
    return state.themes.find((t) => t.name === state.themeConfig.theme) ?? DEFAULT_THEME;
  });

export const useThemeCustomizerActions = () =>
  useThemeCustomizer((state) => ({
    setThemeConfig: state.setThemeConfig,
    generateThemes: state.generateThemes,
    updateThemeMapping: state.updateThemeMapping,
  }));
