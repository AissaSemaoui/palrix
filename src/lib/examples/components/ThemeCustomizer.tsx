import { useTheme } from "next-themes";
import React from "react";

import { useSelectedCustomizerTheme } from "@/lib/examples/use-theme-config";

type ThemeCustomizerProps = React.PropsWithChildren;

const ThemeCustomizer = ({ children }: ThemeCustomizerProps) => {
  const { theme: mode } = useTheme();

  const theme = useSelectedCustomizerTheme();

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
