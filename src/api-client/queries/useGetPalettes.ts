import { useQuery } from "@tanstack/react-query";

import { queryKeys, requests } from "@/api-client/requests";

import { type CustomQueryOptions } from "@/types";

type GetPalettesRequest = typeof requests.getPalettes;

export const useGetPalettes = (options?: Omit<CustomQueryOptions<GetPalettesRequest>, "queryFn">) => {
  return useQuery({
    ...options,
    queryFn: requests.getPalettes,
    queryKeys: queryKeys.getPalettes(),
  });
};
