import type { AxiosInstance, AxiosRequestConfig } from "axios";

import { axiosInstance } from "@/lib/axios";
import { AppSession } from "@/types";
import { Palette } from "@/server/types";

import { GeneratePaletteValidation } from "@/server/validations/generation.validation";

const makeRequests = (axios: AxiosInstance, config?: AxiosRequestConfig) => {
  return {
    userMe: () => axios.get<AppSession>("/api/auth/me").then((res) => res?.data),
    signOut: () => axios.post<void>("/api/auth/logout", {}),
    generatePalette: (data: GeneratePaletteValidation["body"]) =>
      axios.post<ApiResponseReturn<Palette>>("/api/generate/palette", data).then((res) => res.data.data),
    getPalettes: () => axios.get<ApiResponseReturn<Palette[]>>("/api/palettes?p=all&s=24").then((res) => res.data.data),
  };
};

export const queryKeys = {
  userMe: () => ["me"],
  getPalettes: () => ["palettes"],
};

export const requests = makeRequests(axiosInstance);

export type Response<T extends keyof typeof requests> = Awaited<ReturnType<(typeof requests)[T]>>;

export type Requests = typeof requests;
