"use client";

import { MutationFunction, MutationOptions, useMutation } from "@tanstack/react-query";

import { requests, type Requests } from "./requests";

const makeUseMutation = (mutationFn: MutationFunction<unknown, void>) => (options: MutationOptions) =>
  useMutation({
    mutationFn,
    ...options,
  });

const makeMutations = (requests: Requests, config?: MutationOptions) => {
  return {
    useSignIn: makeUseMutation(() => requests.userMe()),
    useSignOut: makeUseMutation(() => requests.signOut()),
  };
};

export const mutations = makeMutations(requests);
