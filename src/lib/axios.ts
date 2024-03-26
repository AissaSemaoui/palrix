import { paths } from "@/config/navigations";
import axios, { AxiosError } from "axios";
import httpStatus from "http-status";

export const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.status === httpStatus.UNAUTHORIZED) {
      window.location.href = paths.auth.login;
    }
  },
);
