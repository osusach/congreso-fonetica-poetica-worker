import { createClient } from "@libsql/client";

export function dbClient(env: Bindings) {
  const client = createClient({
    url: env.TURSO_URL,
    authToken: env.TURSO_TOKEN,
  });
  return client;
}
