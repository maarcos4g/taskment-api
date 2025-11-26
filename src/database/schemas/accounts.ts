import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { users } from "./users.ts";

export const accountProvider = pgEnum('account_provider', [
  'google'
])

export const accounts = pgTable('accounts', {
  id: uuid().primaryKey().defaultRandom(),
  provider: accountProvider().default('google').notNull(),
  providerAccountId: text().notNull(),

  userId: uuid().references(() => users.id, {onDelete: 'cascade'}).notNull()
})