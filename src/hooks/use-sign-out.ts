"use client";

import { useSignOut as useMutationSignOut } from "@/api-client/mutations/useSignOut";
import { useRouter } from "next/navigation";

export const useSignOut = () => {
  const router = useRouter();

  return useMutationSignOut({
    onSuccess: () => {
      router.refresh();
    },
  });
};
