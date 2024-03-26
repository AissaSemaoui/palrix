"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";

import { requests, Requests } from "./requests";

const makeQueries = (requests: Requests, config?: QueryOptions) => {
  return {
    useUserGetList: () =>
      useQuery({
        queryFn: () => requests.userGetList({}),
        queryKey: [],
      }),
  };
};

export const queryKeys = {
  userGetList: () => ["userGetList"],
};

export const queries = makeQueries(requests);
