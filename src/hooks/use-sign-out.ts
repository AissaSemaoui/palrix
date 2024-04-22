import { mutations, queryClient, queryKeys } from "@/api-client";

export const useSignOut = () => {
  return mutations.useSignOut({
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.userMe(),
      }),
  });
};
