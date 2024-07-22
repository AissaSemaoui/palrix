import { MutationOptions, useMutation } from "@tanstack/react-query";
import { requests } from "../requests";

export const useSignOut = (options?: MutationOptions) =>
  useMutation({
    mutationFn: requests.signOut,
    ...options,
  });
