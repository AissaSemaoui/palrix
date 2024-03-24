import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

import env from "@environments";

const migrateClient = postgres(env.db.url, { max: 1 });
migrate(drizzle(migrateClient), "");

const queryClient = postgres(env.db.url);
export const db = drizzle(queryClient);
