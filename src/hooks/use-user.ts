"use client";

import { create } from "zustand";

import type { User } from "@/types";

interface UseUser {
  userMe: User | null;
  setUserMe: (userMe: User | null) => void;
}

export const useUser = create<UseUser>((set) => ({
  userMe: null,
  setUserMe: (userMe) => set(() => ({ userMe })),
}));

export const useUserMe = () => useUser((state) => state.userMe);
