import type { AxiosInstance, AxiosRequestConfig } from "axios";

import { axiosInstance } from "@/lib/axios";
import { AppSession } from "@/types";

const makeRequests = (axios: AxiosInstance, config?: AxiosRequestConfig) => {
  return {
    userMe: (params?: AxiosRequestConfig) =>
      axios.get<AppSession>("/api/auth/me", { ...params }).then((res) => res?.data),
    signOut: (params?: AxiosRequestConfig) => axios.post<void>("/api/auth/logout", {}, { ...params }),
  };
};

export const queryKeys = {
  userMe: () => ["me"],
};

export const requests = makeRequests(axiosInstance);

export type Response<T extends keyof typeof requests> = Awaited<ReturnType<(typeof requests)[T]>>;

export type Requests = typeof requests;
