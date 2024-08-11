"use client";

import { useUser } from "@clerk/nextjs";

export const useUserMe = () => {
  return useUser();
};
