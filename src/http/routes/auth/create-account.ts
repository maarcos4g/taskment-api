import { database } from "@/database/connection.ts";
import { schema } from "@/database/schemas/index.ts";
import { hash } from "argon2";
import { eq } from "drizzle-orm";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";

export const createAccount: FastifyPluginAsyncZod = async (server) => {
  server
    .post(
      '/create-account',
      {
        schema: {
          summary: 'Create a new account',
          body: z.object({
            name: z.string().min(3),
            email: z.email(),
            password: z.string().min(6),
          })
        }
      },
      async (request, reply) => {
        const { name, email, password } = request.body

        const [userWithSameEmail] = await database
          .select({})
          .from(schema.users)
          .where(
            eq(schema.users.email, email)
          )

          if (userWithSameEmail) {
            throw new Error('User with same e-mail already exists.')
          }

          const passwordHash = await hash(password)

          await database
          .insert(schema.users)
          .values({
            name,
            email,
            passwordHash
          })

          return reply.status(201).send()
      }
    )
}