import * as z from "zod";

export const generatePaletteValidation = z.object({
  body: z.object({
    prompt: z.string().optional(),
  }),
});

export type GeneratePaletteValidation = z.infer<typeof generatePaletteValidation>;
