import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verifyNextSession } from "@/server/middlewares/auth.middleware";
import { paths } from "@/config/navigations";

export const requireSession = async () => {
  const { session } = await verifyNextSession(cookies().toString());

  if (!session) {
    return redirect(paths.auth.login);
  }

  return session;
};
