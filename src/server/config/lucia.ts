import { Lucia, User } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

import { db } from "@server/db";
import { sessionTable, userTable } from "@server/db/schema";

const luciaAdapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(luciaAdapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (dbUser) => ({
    id: dbUser.id,
    email: dbUser.email,
    displayName: dbUser.id,
    role: dbUser.role,
    avatar_url: dbUser?.avatar_url,
  }),
});
