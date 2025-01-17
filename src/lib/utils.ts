import { Shade } from "@/server/types";
import chroma from "chroma-js";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatColor = (shade?: Shade) => {
  if (!shade) return;
  return chroma.hsl(...shade).hex();
};

export const copyToClipboard = (content?: string) => navigator.clipboard.writeText(content ?? "");
