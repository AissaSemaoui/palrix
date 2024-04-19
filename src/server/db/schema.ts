import { relations } from "drizzle-orm";
import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),

  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const oauthTable = pgTable(
  "oauth_account",
  {
    providerId: text("provider_id").notNull(),
    providerUserId: text("provider_user_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.providerId, table.userId] }),
  }),
);

export const userRelations = relations(userTable, ({ one }) => ({
  session: one(sessionTable, {
    fields: [userTable.id],
    references: [sessionTable.userId],
    relationName: "user_session",
  }),
  oauth_account: one(oauthTable, {
    fields: [userTable.id],
    references: [oauthTable.userId],
    relationName: "oauth_account",
  }),
}));
