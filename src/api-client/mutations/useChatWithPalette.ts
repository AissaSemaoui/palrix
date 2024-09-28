"use client";

import { queryKeys, requests } from "@/api-client/requests";
import { CustomMutationOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";

type ChatWithPalette = (
  variables: Parameters<typeof requests.chatWithPalette>[1],
) => ReturnType<typeof requests.chatWithPalette>;

export const useChatWithPalette = (paletteId: string, options?: CustomMutationOptions<ChatWithPalette>) =>
  useMutation({
    ...options,
    mutationFn: (data) => requests.chatWithPalette(paletteId, data),
  });
