import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL!;

const migrateClient = postgres(DATABASE_URL, { max: 1 });
migrate(drizzle(migrateClient), "");

const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle(queryClient);
