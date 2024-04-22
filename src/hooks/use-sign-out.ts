"use client";

import { useRouter } from "next/navigation";

import { mutations } from "@/api-client";

export const useSignOut = () => {
  const router = useRouter();

  return mutations.useSignOut({
    onSuccess: () => {
      router.refresh();
    },
  });
};
