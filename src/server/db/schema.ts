import { relations } from "drizzle-orm";
import { pgEnum, pgTable, primaryKey, text, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";

import { createId } from "@server/utils/generics";
import { type Shade, UserRoles } from "@server/types";

export const rolesEnum = pgEnum("role", [UserRoles.ADMIN, UserRoles.USER]);

export const users = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(createId),
  email: text("email").notNull(),
  displayName: text("display_name").notNull(),
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

export const palettes = pgTable("palette", {
  id: text("id").primaryKey().$defaultFn(createId),
  name: text("name").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  colors: jsonb("colors").array().notNull().$type<Shade[]>(),
  isPublic: boolean("is_public").notNull().default(false),

  createdAt: timestamp("createdAt", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
  updatedAt: timestamp("updatedAt", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

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
  palette: one(palettes, {
    fields: [users.id],
    references: [palettes.userId],
    relationName: "palette",
  }),
}));
