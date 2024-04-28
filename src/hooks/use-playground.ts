import { Palette } from "@/server/types";
import { create } from "zustand";

interface UsePlayground {
  prompt: string;
  setPrompt: (prompt: string) => void;

  selectedPalette: Palette | null;
  setSelectedPalette: (palette: Palette) => void;
}

export const usePlayground = create<UsePlayground>((set) => ({
  prompt: "",
  setPrompt: (prompt) => set({ prompt }),

  selectedPalette: null,
  setSelectedPalette: (palette) => set({ selectedPalette: palette }),
}));

export const useSelectedPalette = () => usePlayground((state) => state.selectedPalette);

export const usePlaygroundActions = () =>
  usePlayground((state) => ({
    setPrompt: state.setPrompt,
    setSelectedPalette: state.setSelectedPalette,
  }));
