import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: false,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  // (error: AxiosError) => {},
);
