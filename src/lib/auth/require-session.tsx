import { redirect } from "next/navigation";

import { paths } from "@/config/navigations";
import { verifyNextSession } from "@/server/middlewares/auth.middleware";
import { cookies } from "next/headers";
import { AppSession } from "@/types";

export const requireSession = async (): Promise<AppSession> => {
  const { session, user } = await verifyNextSession(cookies().toString());

  if (!session || !user) {
    return redirect(paths.auth.login);
  }

  return { session, user };
};
