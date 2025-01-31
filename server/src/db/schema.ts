import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users_table", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").unique(),
  password: text("password").notNull(),
});

export const sessionsTable = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => usersTable.id),
  token: text("token").notNull(),
  userAgent: text("user_agent"),
  isValid: boolean("is_valid").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
});

export type UsersSelect = typeof usersTable.$inferSelect;
export type UsersInsert = typeof usersTable.$inferInsert;
export type SessionsSelect = typeof sessionsTable.$inferSelect;
export type SessionsInsert = typeof sessionsTable.$inferInsert;
