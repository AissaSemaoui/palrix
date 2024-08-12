import "dotenv/config";

const env = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,

  db: {
    url: process.env.DATABASE_URL!,
    public_url: process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL!,
  },

  auth: {},
  clerk: {
    webhookSecret: process.env.CLERK_WEBHOOK_SECRET,
  },

  ai: {
    modelApiKey: process.env.MODEL_API_KEY!,
  },
};

export default env;
