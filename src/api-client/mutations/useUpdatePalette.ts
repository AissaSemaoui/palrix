"use client";

import { requests } from "@/api-client/requests";
import { CustomMutationOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";

type UpdatePalette = (
  payload: Parameters<typeof requests.updatePalette>[1],
) => ReturnType<typeof requests.updatePalette>;

export const useUpdatePalette = (paletteId?: string, options?: CustomMutationOptions<UpdatePalette>) => {
  return useMutation({
    ...options,
    mutationFn: (payload) => {
      if (!paletteId) throw new Error("Palette ID is required to update");

      return requests.updatePalette(paletteId, payload);
    },
  });
};
