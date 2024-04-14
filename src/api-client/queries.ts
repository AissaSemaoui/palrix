"use client";

import { QueryOptions, useQuery, UseQueryResult } from "@tanstack/react-query";

import { queryKeys, requests, type Response, type Requests } from "./requests";

type QueryResponse<T extends keyof typeof requests> = UseQueryResult<Response<T>>;

const makeQueries = (requests: Requests, config?: QueryOptions) => {
  return {
    useUserMe: (options?: QueryOptions): QueryResponse<"userMe"> =>
      useQuery({
        queryFn: () => requests.userMe(),
        queryKey: queryKeys.userMe(),
        ...options,
      }),
  };
};

export const queries = makeQueries(requests);
