import { cookies } from "next/headers";

import { verifyNextSession } from "@/server/middlewares/auth.middleware";

export const getSession = async () => {
  try {
    const { session } = await verifyNextSession(cookies().toString());

    if (!session) {
      return null;
    }

    return session;
  } catch (error) {
    return null;
  }
};
