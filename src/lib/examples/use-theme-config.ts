import { themes } from "@/lib/examples/themes";
import { Palette } from "@/server/types";
import { create } from "zustand";
import { generateThemeFromColor } from "./generateThemeFromColor";
import { Theme } from "@/types";

type ThemeConfig = {
  style: string;
  theme: string;
  radius: number;
};

type UseThemeCustomizer = {
  themeConfig: ThemeConfig;
  setThemeConfig: (theme: Partial<ThemeConfig>) => void;
  selectedTheme: Theme;
  themes: Theme[];
  generateThemes: (palette: Palette) => void;
};

const config = {
  style: "default",
  theme: "red",
  radius: 0.5,
};

const defaultTheme = themes[0];

export const useThemeCustomizer = create<UseThemeCustomizer>((set) => ({
  themeConfig: config,
  setThemeConfig: (theme) =>
    set((state) => ({
      themeConfig: { ...state.themeConfig, ...theme },
      selectedTheme: state.themes.find((t) => t.name === theme.theme) ?? defaultTheme,
    })),
  selectedTheme: defaultTheme,
  themes: themes,
  generateThemes: (palette) => set({ themes: palette.colors.map(generateThemeFromColor) }),
}));

useThemeCustomizer.subscribe((state) => console.log("theme customizer subscribed: ", state));

export const useThemeConfig = () => useThemeCustomizer((state) => state.themeConfig);

export const useSelectedCustomizerTheme = () => useThemeCustomizer((state) => state.selectedTheme);

export const useThemeCustomizerActions = () =>
  useThemeCustomizer((state) => ({ setThemeConfig: state.setThemeConfig, generateThemes: state.generateThemes }));
