"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";
import { queryKeys, requests } from "../requests";

export const useUserMe = (options?: QueryOptions) =>
  useQuery({
    queryFn: requests.userMe,
    queryKey: queryKeys.userMe(),
  });
