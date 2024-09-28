import type { AxiosInstance, AxiosRequestConfig } from "axios";

import { axiosInstance } from "@/lib/axios";
import { Palette } from "@/server/types";

import { ChatWithPaletteValidation, GeneratePaletteValidation } from "@/server/validations/generation.validation";

import { type ApiResponseReturn } from "@/server/utils/response";

const makeRequests = (axios: AxiosInstance, config?: AxiosRequestConfig) => {
  return {
    signOut: () => axios.post<void>("/api/auth/logout", {}),
    generatePalette: (data: GeneratePaletteValidation["body"]) =>
      axios.post<ApiResponseReturn<Palette>>("/api/generate/palette", data).then((res) => res.data.data),
    chatWithPalette: (paletteId: string, data: ChatWithPaletteValidation["body"]) =>
      axios.post<ApiResponseReturn<Palette>>(`/api/generate/palette/${paletteId}`, data).then((res) => res.data.data),
    getPalettes: () => axios.get<ApiResponseReturn<Palette[], true>>("/api/palettes").then((res) => res.data.data),
    getPalette: (paletteId: string) =>
      axios.get<ApiResponseReturn<Palette>>(`/api/palettes/${paletteId}`).then((res) => res.data.data),
  };
};

export const queryKeys = {
  getPalettes: () => ["palettes"],
  getPalette: (paletteId: string) => ["palettes", paletteId],
};

export const requests = makeRequests(axiosInstance);

export type Response<T extends keyof typeof requests> = Awaited<ReturnType<(typeof requests)[T]>>;

export type Requests = typeof requests;
