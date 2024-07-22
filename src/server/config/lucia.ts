import { Lucia, TimeSpan } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

import { db } from "@server/db";
import { sessions, users } from "@server/db/schema";

const luciaAdapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(luciaAdapter, {
  sessionExpiresIn: new TimeSpan(30, "d"), // no more active/idle
  sessionCookie: {
    name: "session",
    expires: false, // session cookies have very long lifespan (2 years)
    attributes: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    },
  },
  getUserAttributes: (dbUser) => ({
    id: dbUser.id,
    email: dbUser.email,
    displayName: dbUser.displayName,
    role: dbUser.role,
    avatar_url: dbUser?.avatar_url || null,
  }),
});
