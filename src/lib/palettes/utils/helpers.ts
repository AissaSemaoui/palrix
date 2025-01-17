import { Color } from "@/server/types";

type ColorUpdate = {
  index: number;
  updates: Partial<Color>;
};

export const generateUpdatedPaletteColors = (currentColors: Color[], updates: ColorUpdate[]): Color[] => {
  const newColors = [...currentColors];

  updates.forEach((update) => {
    const oldColor = newColors[update.index];
    if (oldColor) {
      newColors[update.index] = {
        ...oldColor,
        ...update.updates,
      };
    }
  });

  return newColors;
};
