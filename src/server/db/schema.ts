import { relations } from "drizzle-orm";
import { pgEnum, pgTable, primaryKey, text, timestamp, jsonb, boolean, integer } from "drizzle-orm/pg-core";

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

export const palettes = pgTable("palette", {
  id: text("id").primaryKey().$defaultFn(createId),
  name: text("name").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  maxShades: integer("max_shades").notNull(),
  primaryShade: integer("primary_shade").notNull(),
  colors: jsonb("colors").array().notNull().$type<Shade[]>(),
  isPublic: boolean("is_public").notNull().default(false),

  createdAt: timestamp("createdAt", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
  updatedAt: timestamp("updatedAt", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
});

export const userRelations = relations(users, ({ one }) => ({
  palette: one(palettes, {
    fields: [users.id],
    references: [palettes.userId],
    relationName: "palette",
  }),
}));
