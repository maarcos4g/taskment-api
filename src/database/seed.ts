import { reset, seed } from 'drizzle-seed'
import { database, sql } from './connection.ts'
import { schema } from './schemas/index.ts'
import { hash } from 'argon2'

await reset(database, schema)

const defaultPasswordData = '00000000'
const passwordHash = await hash(defaultPasswordData)

await seed(database, schema).refine((faker) => {
  return {
    users: {
      count: 10,
      columns: {
        name: faker.fullName(),
        email: faker.email(),
        passwordHash: faker.default({ defaultValue: passwordHash }),
        avatarURL: faker.default({ defaultValue: 'https://github.com/shadcn.png' }),
      }
    }
  }
})

await sql.end()

console.log('🔥 Database reset and seeded successfully!')