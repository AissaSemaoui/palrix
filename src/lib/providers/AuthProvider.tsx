"use client";

import React, { useEffect, useRef } from "react";

import { useUser } from "@/hooks/use-user";
import { useUserMe } from "@/api-client/queries/useUserMe";

import type { AppSession } from "@/types";

interface AuthProviderProps {
  initialSession?: AppSession;
  children: React.ReactNode;
}

const AuthProvider = ({ children, initialSession }: AuthProviderProps) => {
  const setUserMe = useUser((state) => state.setUserMe);

  const { data, isError, isSuccess, isPending } = useUserMe({
    initialData: initialSession,
    retry: false,
  });

  const initialRender = useRef(true);

  if (isPending && initialRender.current && initialSession?.user) {
    setUserMe(initialSession.user);
    initialRender.current = false;
  }

  useEffect(() => {
    if (isSuccess) {
      setUserMe(data.user);
    } else if (isError) {
      setUserMe(null);
    }
  }, [setUserMe, isError, isSuccess]);

  return <>{children}</>;
};

export default React.memo(AuthProvider);
