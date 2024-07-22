import { MutationOptions, useMutation } from "@tanstack/react-query";
import { queryKeys, requests } from "../requests";

export const useSignIn = (options?: MutationOptions) =>
  useMutation({
    ...options,
    mutationKey: queryKeys.userMe(),
    mutationFn: requests.userMe,
  });
