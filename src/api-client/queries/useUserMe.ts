"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys, requests } from "@/api-client/requests";
import { CustomQueryOptions } from "@/types";
import { AxiosError } from "axios";

type UserMeRequest = typeof requests.userMe;

type UseUserMeOptions = Omit<
  CustomQueryOptions<UserMeRequest> & {
    onSuccess?: (data: Awaited<ReturnType<UserMeRequest>>) => void;
    onError?: (error: AxiosError) => void;
  },
  "queryFn"
>;

export const useUserMe = (options?: UseUserMeOptions) => {
  const customUserMe = async () => {
    try {
      const data = await requests.userMe();
      options?.onSuccess?.(data);
      return data;
    } catch (error: any) {
      options?.onError?.(error);
      throw error;
    }
  };

  return useQuery({
    ...options,
    queryFn: customUserMe,
    queryKey: queryKeys.userMe(),
  });
};
