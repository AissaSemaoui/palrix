import { sendAiPrompt } from "@server/config/ai-model";
import { PALETTE_GENERATION_PROMPT } from "@server/config/prompts";

import type { GeneratePaletteValidation } from "@server/validations/generation.validation";
import type { Palette, Shade } from "@server/types";

interface PaletteGenerationAiResponse {
  name: string;
  primaryShade: number;
  colors: Shade[];
}

type PaletteDraft = Omit<Palette, "userId" | "createdAt" | "updatedAt">;

export const generatePalette = async ({ userPrompt }: GeneratePaletteValidation["body"]): Promise<PaletteDraft> => {
  const { id, content, total_tokens } = await sendAiPrompt(PALETTE_GENERATION_PROMPT, userPrompt);

  const paletteObj: PaletteGenerationAiResponse = JSON.parse(content);

  console.log(total_tokens);

  return {
    id,
    name: paletteObj.name,
    primaryShade: paletteObj.primaryShade,
    colors: paletteObj.colors,
    isPublic: true,
    maxShades: paletteObj.colors.sort((p, n) => p.shades.length - n.shades.length)[0].shades.length,
  };
};
