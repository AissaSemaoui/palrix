import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "@server/db/schema";
import env from "@environments";

// const migrateClient = postgres(env.db.url, { max: 1 });
// migrate(drizzle(migrateClient), { migrationsFolder: "drizzle" });

const pool = new pg.Pool({
  connectionString: env.db.url,
});
export const db = drizzle(pool, { schema });
