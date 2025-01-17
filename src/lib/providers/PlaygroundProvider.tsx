"use client";

import { Color, Palette } from "@/server/types";
import { UpdatePaletteValidation } from "@/server/validations/palettes.validation";
import React, { useEffect, useState } from "react";
import { generateUpdatedPaletteColors } from "../palettes/utils/helpers";

interface Playground {
  defaultPalette: Palette;
  currentPalette: Palette;
  updatePalette: (updates: UpdatePaletteValidation["body"]["payload"]) => void;
  reset: () => void;
  isDirty: boolean;
}

interface PlaygroundProviderProps extends React.PropsWithChildren {
  defaultPalette: Palette;
}

// const DEFAULT_VALUE = {
//   defaultPalette: null,
//   currentPalette: null,
//   updatePalette: () => {},
//   reset: () => {},
// };

export const PlaygroundContext = React.createContext<Playground | null>(null);

const PlaygroundProvider = ({ children, defaultPalette }: PlaygroundProviderProps) => {
  const [currentPalette, setCurrentPalette] = useState(defaultPalette);

  const isDirty = JSON.stringify(currentPalette.colors) !== JSON.stringify(defaultPalette.colors);
  console.log("comparing: ", currentPalette.colors[0].shades, defaultPalette.colors[0].shades);
  console.log("isDirty: ", isDirty);

  const updatePalette: Playground["updatePalette"] = (updates) => {
    const { colors, ...restUpdates } = updates;

    let newColors: Color[] = [];

    setCurrentPalette((prevPalette) => {
      if (colors) {
        newColors = generateUpdatedPaletteColors(prevPalette.colors, colors);
      }

      return {
        ...prevPalette,
        ...restUpdates,
        ...(newColors.length && { colors: newColors }),
      };
    });
  };

  const handleReset = () => {
    setCurrentPalette(defaultPalette);
  };

  if (!currentPalette || !defaultPalette) return null;

  // useEffect(() => {
  //   handleReset();
  // }, [defaultPalette]);

  return (
    <PlaygroundContext.Provider
      value={{
        defaultPalette,
        currentPalette,
        updatePalette,
        reset: handleReset,
        isDirty,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
};

export default PlaygroundProvider;
