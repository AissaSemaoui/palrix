import env from "@environments";
import "dotenv/config";

import type { Config } from "drizzle-kit";

console.log(env.db.url);

export default {
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: env.db.public_url,
  },
} satisfies Config;
