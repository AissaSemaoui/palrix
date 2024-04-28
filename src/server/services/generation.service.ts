import { GeneratePaletteValidation } from "@server/validations/generation.validation";

export const generatePalette = async ({ prompt }: GeneratePaletteValidation["body"]) => {
  const textResponse = `${prompt} xDDDD`;

  return textResponse;
};
