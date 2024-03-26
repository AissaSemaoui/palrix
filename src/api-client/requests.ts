"use client";

import { axiosInstance } from "@/lib/axios";
import { AxiosInstance, AxiosRequestConfig } from "axios";

const makeRequests = (axios: AxiosInstance, config?: AxiosRequestConfig) => {
  return {
    userGetList: async (params?: AxiosRequestConfig) => axios.get("/users", { ...config, ...params }),
  };
};

export const requests = makeRequests(axiosInstance);

export type Requests = ReturnType<typeof makeRequests>;
