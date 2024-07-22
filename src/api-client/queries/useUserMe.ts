"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys, requests } from "@/api-client/requests";
import { CustomQueryOptions } from "@/types";

type UserMeRequest = typeof requests.userMe;

export const useUserMe = (options?: Omit<CustomQueryOptions<UserMeRequest>, "queryFn">) => {
  return useQuery({
    ...options,
    queryFn: requests.userMe,
    queryKey: queryKeys.userMe(),
  });
};
