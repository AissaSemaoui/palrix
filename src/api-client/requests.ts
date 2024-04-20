import { axiosInstance } from "@/lib/axios";
import { User } from "@/types";
import { AxiosInstance, AxiosRequestConfig } from "axios";

const makeRequests = (axios: AxiosInstance, config?: AxiosRequestConfig) => {
  return {
    userMe: (params?: AxiosRequestConfig) => axios.get<User>("/api/auth/me", { ...params }).then((res) => res?.data),
  };
};

export const queryKeys = {
  userMe: () => ["me"],
};

export const requests = makeRequests(axiosInstance);

export type Response<T extends keyof typeof requests> = Awaited<ReturnType<(typeof requests)[T]>>;

export type Requests = typeof requests;
