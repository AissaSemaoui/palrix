import * as z from "zod";

export const generatePaletteValidation = z.object({
  body: z.object({
    userPrompt: z.string().optional(),
  }),
});

export const chatWithPaletteValidation = z.object({
  params: z.object({
    paletteId: z.string().min(10, "PaletteId is required!"),
  }),
  body: z.object({
    userPrompt: z.string().min(2, "Prompt is required!"),
  }),
});

export type GeneratePaletteValidation = z.infer<typeof generatePaletteValidation>;
export type ChatWithPaletteValidation = z.infer<typeof chatWithPaletteValidation>;
