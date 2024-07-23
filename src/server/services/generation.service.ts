import { sendAiPrompt } from "@server/config/ai-model";
import { PALETTE_GENERATION_PROMPT } from "@server/config/prompts";

import type { GeneratePaletteValidation } from "@server/validations/generation.validation";
import type { Palette } from "@server/types";
import { generateColorPalette } from "@server/utils/colors";
import { MAX_SHADES_NUMBER } from "@/config/constants";

interface PaletteGenerationAiResponse {
  name: string;
  primaryShade: number;
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

  console.log(content);

  console.time("Generating Duration");
  const paletteObj: PaletteGenerationAiResponse = JSON.parse(content);
  console.timeEnd("Generating Duration");

  const maxShades = MAX_SHADES_NUMBER;

  const generatedPalette = paletteObj.colors.map((c) => ({
    name: c.name,
    shades: generateColorPalette(c.shade, {
      numShades: maxShades,
      lightnessRange: [0.95, 0.05],
      saturationRange: [1, 0.5],
      ...c.config,
      interpolationMethod: "linear",
    }),
    // shades: generateShades(c.shade, maxShades, [0.98, 0.2], [1, 0.3]),
  }));

  console.log(total_tokens);

  return {
    id,
    name: paletteObj.name,
    primaryShade: paletteObj.primaryShade,
    colors: generatedPalette,
    isPublic: true,
    maxShades,
  };
};
