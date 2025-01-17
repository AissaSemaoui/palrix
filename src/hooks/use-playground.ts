import { PlaygroundContext } from "@/lib/providers/PlaygroundProvider";
import { useContext } from "react";

export const usePlayground = () => {
  const context = useContext(PlaygroundContext);

  if (!context) throw new Error("useContext must be used within the PlaygroundProvider!");

  return context;
};
