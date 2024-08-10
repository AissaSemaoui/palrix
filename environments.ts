import "dotenv/config";

const env = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,

  db: {
    url: process.env.DATABASE_URL!,
    public_url: process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL!,
  },

  auth: {
    googleClientId: process.env.GOOGLE_CLIENT_ID!,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL!,
  },

  ai: {
    modelApiKey: process.env.MODEL_API_KEY!,
  },
};

export default env;
