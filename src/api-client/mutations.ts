"use client";

import { MutationOptions, useMutation } from "@tanstack/react-query";

import { requests, type Requests } from "./requests";

const makeMutations = (requests: Requests, config?: MutationOptions) => {
  return {
    useSignIn: (options: MutationOptions) =>
      useMutation({
        mutationFn: () => requests.userMe(),
        ...options,
      }),
  };
};

export const mutations = makeMutations(requests);
