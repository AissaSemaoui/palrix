import React from "react";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/get-session";
import { paths } from "@/config/navigations";

const AuthLayout = async ({ children }: React.PropsWithChildren) => {
  const session = await getSession();

  if (session) {
    return redirect(paths.dashboard.root);
  }

  return <>{children}</>;
};

export default AuthLayout;
