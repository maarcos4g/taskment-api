import { server } from "./app";

server.listen({
  port: 3333,
  host: '0.0.0.0',
})
  .then(async () => console.log('HTTP server running on http://localhost:3333'))