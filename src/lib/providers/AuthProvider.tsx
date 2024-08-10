"use client";

import React, { useEffect, useMemo, useRef } from "react";

import { useUser } from "@/hooks/use-user";
import { useUserMe } from "@/api-client/queries/useUserMe";

import type { AppSession } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { paths } from "@/config/navigations";

interface AuthProviderProps {
  initialSession?: AppSession | null;
  children: React.ReactNode;
}

const AuthProvider = ({ children, initialSession }: AuthProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { setUserMe } = useUser();

  const { data } = useUserMe({
    initialData: initialSession ?? undefined,
    retry: false,
    onSuccess: (data) => {
      setUserMe(data.user);
    },
    onError: () => {
      setUserMe(null);
    },
  });

  const userMe = useMemo(() => data?.user, [data]);

  useEffect(() => {
    if (userMe && pathname.includes(paths.auth.root)) {
      router.push(paths.dashboard.home);
    } else if (!userMe && pathname.includes(paths.dashboard.root)) {
      router.push(paths.auth.login);
    }
  }, [userMe]);

  return <>{children}</>;
};

export default React.memo(AuthProvider);
