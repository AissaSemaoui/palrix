"use client";

import { requests } from "@/api-client/requests";
import { CustomMutationOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";

type GeneratePalette = typeof requests.generatePalette;

export const useChatWithPalette = (options?: CustomMutationOptions<GeneratePalette>) =>
  useMutation({
    ...options,
    mutationFn: requests.generatePalette,
  });
