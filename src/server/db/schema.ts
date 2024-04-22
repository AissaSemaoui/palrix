import { InferSelectModel, relations } from "drizzle-orm";
import { pgEnum, pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

import { UserRoles } from "@server/types";

export const rolesEnum = pgEnum("role", [UserRoles.ADMIN, UserRoles.USER]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull(),
  displayName: text("name").notNull(),
  avatar_url: text("avatar_url"),
  role: rolesEnum("role").notNull().default(UserRoles.USER),
});

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),

  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const auth_providers = pgTable(
  "oauth_account",
  {
    providerId: text("provider_id").notNull(),
    providerUserId: text("provider_user_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.providerId, table.userId] }),
  }),
);

export const userRelations = relations(users, ({ one }) => ({
  session: one(sessions, {
    fields: [users.id],
    references: [sessions.userId],
    relationName: "user_session",
  }),
  oauth_account: one(auth_providers, {
    fields: [users.id],
    references: [auth_providers.userId],
    relationName: "oauth_account",
  }),
}));
