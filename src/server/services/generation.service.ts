import chroma from "chroma-js";

import { MAX_SHADES_NUMBER } from "@/config/constants";
import { sendAiPrompt } from "@server/config/ai-model";
import { PALETTE_GENERATION_PROMPT } from "@server/config/prompts";
import { generateColorPalette } from "@server/utils/colors";
import type { GeneratePaletteValidation } from "@server/validations/generation.validation";

import type { Palette } from "@server/types";
import { eq } from "drizzle-orm";
import httpStatus from "http-status";
import { db } from "../db";
import { palettes } from "../db/schema";
import { DatabaseError } from "../utils/errors";
interface PaletteGenerationAiResponse {
  name: string;
  primaryShade: number;
  description: string;
  colors: {
    name: string;
    shade: string;
    config: {
      lightnessRange?: [number, number];
      saturationRange?: [number, number];
      interpolationMethod?: "bezier" | "linear";
    };
  }[];
}

type PaletteDraft = Omit<Palette, "userId" | "createdAt" | "updatedAt">;

export const generatePalette = async ({ userPrompt }: GeneratePaletteValidation["body"]): Promise<PaletteDraft> => {
  const { id, content, total_tokens } = await sendAiPrompt(PALETTE_GENERATION_PROMPT, userPrompt);

  console.time("Generating Duration");
  const paletteObj: PaletteGenerationAiResponse = JSON.parse(content);
  console.timeEnd("Generating Duration");

  const maxShades = MAX_SHADES_NUMBER;

  const generatedPalette = paletteObj.colors.map((c) => ({
    name: c.name,
    shades: generateColorPalette(c.shade, {
      numShades: maxShades,
      lightnessRange: [0.99, 0.05],
      saturationRange: [1, 0.5],
      ...c.config,
      interpolationMethod: "linear",
    }).shades,
    mainShade: String(chroma(c.shade).get("hex")),
    // shades: generateShades(c.shade, maxShades, [0.98, 0.2], [1, 0.3]),
  }));

  console.log(total_tokens);

  return {
    id,
    name: paletteObj.name,
    description: paletteObj.description,
    primaryShade: paletteObj.primaryShade,
    colors: generatedPalette,
    isPublic: true,
    maxShades,
  };
};

export const chatWithPalette = async (paletteId: string, userPrompt: string): Promise<PaletteDraft> => {
  const [selectedPalette] = await db.select().from(palettes).where(eq(palettes.id, paletteId));

  console.log("Chat With Palette: ", selectedPalette, userPrompt);

  if (!selectedPalette?.id) {
    throw new DatabaseError("No Matching Palette Found!", httpStatus.NOT_FOUND);
  }

  const { id, content, total_tokens } = await sendAiPrompt(
    PALETTE_GENERATION_PROMPT,
    JSON.stringify({ palette: selectedPalette, userPrompt }),
  );

  console.log(content);

  console.time("Generating Duration");
  const paletteObj: PaletteGenerationAiResponse = JSON.parse(content);
  console.timeEnd("Generating Duration");

  const maxShades = MAX_SHADES_NUMBER;

  const generatedPalette = paletteObj.colors.map((c) => ({
    name: c.name,
    shades: generateColorPalette(c.shade, {
      numShades: maxShades,
      lightnessRange: [0.99, 0.05],
      saturationRange: [1, 0.5],
      ...c.config,
      interpolationMethod: "linear",
    }).shades,
    mainShade: String(chroma(c.shade).get("hex")),
    // shades: generateShades(c.shade, maxShades, [0.98, 0.2], [1, 0.3]),
  }));

  console.log(total_tokens);

  return {
    id,
    name: paletteObj.name,
    description: paletteObj.description,
    primaryShade: paletteObj.primaryShade,
    colors: generatedPalette,
    isPublic: true,
    maxShades,
  };
};
