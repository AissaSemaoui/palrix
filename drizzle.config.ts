import env from "@environments";
import "dotenv/config";

import type { Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: env.db.url,
  },
} satisfies Config;
