"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import { Loader } from "@/components/ui/loader";
import { paths } from "@/config/navigations";

const ProtectedProvider = ({ children }: React.PropsWithChildren) => {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  if (!isLoaded) {
    return <Loader />;
  }

  if (!isSignedIn) {
    router.push(paths.auth.login);
    return null;
  }

  return <>{children}</>;
};

export default ProtectedProvider;
