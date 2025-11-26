import { env } from "@/env.ts";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { schema } from "./schemas/index.ts";

export const sql = postgres(env.DATABASE_URL, { max: 1 })
export const database = drizzle(sql, {
  schema,
  casing: 'snake_case',
  logger: true,
})