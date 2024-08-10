"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { type ThemeProviderProps } from "next-themes/dist/types";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider {...props}>
      <Toaster position="bottom-right" />

      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;
