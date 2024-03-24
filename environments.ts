const env = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,

  db: {
    url: process.env.DATABASE_URL,
  },

  auth: {
    googleClientId: process.env.GOOGLE_CLIENT_ID!,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL!,
  },
};

export default env;
