import { server } from "./app.ts";
import { createAccount } from "./routes/auth/create-account.ts";

server.register(createAccount)

server.listen({
  port: 3333,
  host: '0.0.0.0',
})
  .then(async () => console.log('HTTP server running on http://localhost:3333'))