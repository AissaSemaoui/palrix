"use client";

import { create } from "zustand";

import type { UserMe } from "@/types";

interface UseUser {
  userMe: UserMe | null;
  setUserMe: (userMe: UserMe | null) => void;
}

export const useUser = create<UseUser>((set) => ({
  userMe: null,
  setUserMe: (userMe) => set(() => ({ userMe })),
}));

export const useUserMe = () => useUser((state) => state.userMe);
