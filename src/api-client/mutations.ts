"use client";

import { MutationOptions } from "@tanstack/react-query";

import { requests, type Requests } from "./requests";

const makeMutations = (requests: Requests, config?: MutationOptions) => {
  return {};
};

export const mutations = makeMutations(requests);
