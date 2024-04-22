import { cookies } from "next/headers";

import { verifyNextSession } from "@/server/middlewares/auth.middleware";

export const getUserMe = async () => {
  const { user } = await verifyNextSession(cookies().toString());

  if (!user) {
    return null;
  }

  return user;
};
