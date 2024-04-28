"use client";

import { MutationFunction, MutationOptions, UseMutateFunction, useMutation } from "@tanstack/react-query";

import { GeneratePaletteValidation } from "@/server/validations/generation.validation";
import { requests, type Requests } from "./requests";

import type { Palette } from "@/server/types";
import { AxiosError } from "axios";

const makeUseMutation =
  <TData = unknown, TVariables = any>(mutationFn: MutationFunction<TData, TVariables>) =>
  (options: MutationOptions<TData, AxiosError, TVariables>) =>
    useMutation({
      mutationFn,
      ...options,
    });

const makeMutations = (requests: Requests, config?: MutationOptions) => {
  return {
    useSignIn: makeUseMutation(() => requests.userMe()),
    useSignOut: makeUseMutation(() => requests.signOut()),
    useGeneratePalette: makeUseMutation<Palette, GeneratePaletteValidation["body"]>(({ userPrompt }) =>
      requests.generatePalette({
        userPrompt,
      }),
    ),
  };
};

export const mutations = makeMutations(requests);
