"use client";

import React, { useEffect } from "react";

import { useUser } from "@/hooks/use-user";
import { queries } from "@/api-client";

import type { AppSession } from "@/types";

interface AuthProviderProps {
  initialSession?: AppSession;
  children: React.ReactNode;
}

const AuthProvider = ({ children, initialSession }: AuthProviderProps) => {
  const setUserMe = useUser((state) => state.setUserMe);

  const { data, isError, isSuccess } = queries.useUserMe({ initialData: initialSession, retry: false });

  useEffect(() => {
    if (isSuccess) {
      setUserMe(data);
    } else if (isError) {
      setUserMe(null);
    }
  }, [setUserMe, isError, isSuccess]);

  return <>{children}</>;
};

export default AuthProvider;
