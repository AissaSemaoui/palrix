import { useQuery } from "@tanstack/react-query";

import { queryKeys, requests } from "@/api-client/requests";

import { type CustomQueryOptions } from "@/types";

type GetPaletteRequest = () => ReturnType<typeof requests.getPalette>;

let cachedPaletteId = "";

export const useGetPalette = (
  paletteId?: string,
  options?: Omit<CustomQueryOptions<GetPaletteRequest>, "queryFn" | "queryKey">,
) => {
  if (paletteId) {
    cachedPaletteId = paletteId;
  }

  return useQuery({
    refetchOnMount: false,
    ...options,
    queryFn: () => requests.getPalette(cachedPaletteId),
    queryKey: queryKeys.getPalette(cachedPaletteId),
  });
};
