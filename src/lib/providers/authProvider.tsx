"use client";

import React, { useEffect } from "react";

import { queries } from "@/api-client";
import { useUser } from "@/hooks/use-user";

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const setUserMe = useUser((state) => state.setUserMe);

  const { data, isError, isSuccess } = queries.useUserMe({ retry: false });

  useEffect(() => {
    if (isSuccess) {
      setUserMe(data);
    } else if (isError) {
      setUserMe(null);
    }
  }, [isError, isSuccess]);

  return <>{children}</>;
};

export default AuthProvider;