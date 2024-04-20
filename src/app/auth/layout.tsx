import React from "react";
import { redirect } from "next/navigation";

import { requireSession } from "@/lib/auth/require-session";
import { paths } from "@/config/navigations";

const AuthLayout = async ({ children }: React.PropsWithChildren) => {
  const session = await requireSession();

  console.log("here is the session? ", session);
  if (session) {
    console.log("here is the session? ", session);
    return redirect(paths.dashboard.root);
  }

  return <>{children}</>;
};

export default AuthLayout;
