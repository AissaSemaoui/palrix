import axios, { AxiosError } from "axios";
import httpStatus from "http-status";

import { queryClient, queryKeys } from "@/api-client";

export const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {},
);
