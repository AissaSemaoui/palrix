import { Palette } from "@/server/types";
import { create } from "zustand";

type Status = "idle" | "success" | "error" | "loading";

interface UsePlayground {
  prompt: string;
  setPrompt: (prompt: string) => void;

  status: Status;
  setStatus: (status: Status) => void;

  selectedPalette: Palette | null;
  setSelectedPalette: (palette: Palette) => void;
}

export const usePlayground = create<UsePlayground>((set) => ({
  prompt: "",
  setPrompt: (prompt) => set({ prompt }),

  status: "idle",
  setStatus: (status) => set({ status }),

  selectedPalette: null,
  setSelectedPalette: (palette) => set({ selectedPalette: palette }),
}));

export const useSelectedPalette = () => usePlayground((state) => state.selectedPalette);

export const usePrompt = () => usePlayground((state) => state.prompt);

export const usePlaygroundStatus = () => usePlayground((state) => state.status);

export const usePlaygroundActions = () =>
  usePlayground((state) => ({
    setPrompt: state.setPrompt,
    setSelectedPalette: state.setSelectedPalette,
    setStatus: state.setStatus,
  }));
