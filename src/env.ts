import { z } from "zod/v4";

const envSchema = z.object({
  DATABASE_URL: z.url(),
  FRONTEND_URL: z.string(),
})

export const env = envSchema.parse(process.env)