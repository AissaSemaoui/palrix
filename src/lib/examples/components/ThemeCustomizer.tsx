import { useTheme } from "next-themes";
import React, { useEffect } from "react";

import { useSelectedCustomizerTheme, useThemeCustomizerActions } from "@/hooks/use-theme-config";
import { usePlayground } from "@/hooks/use-playground";

type ThemeCustomizerProps = React.PropsWithChildren;

const ThemeCustomizer = ({ children }: ThemeCustomizerProps) => {
  const { theme: mode } = useTheme();
  const { currentPalette } = usePlayground();

  const { generateThemes } = useThemeCustomizerActions();

  const theme = useSelectedCustomizerTheme();

  useEffect(() => {
    if (currentPalette) generateThemes(currentPalette);
  }, [currentPalette]);

  const selectedCssVars = Object.entries(theme?.cssVars[mode === "light" ? "light" : "dark"] ?? {});
  const cssVars = selectedCssVars.reduce(
    (acc, [key, value]) => {
      acc[`--${key}`] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  return (
    <div
      id="theme-customizer"
      style={
        {
          ...cssVars,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};

export default ThemeCustomizer;
