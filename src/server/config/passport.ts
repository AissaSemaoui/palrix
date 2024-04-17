import { Strategy as GoogleOAuthStrategy, Profile, StrategyOptions, VerifyCallback } from "passport-google-oauth20";

import env from "@environments";

import type { PassportStatic } from "passport";

const GoogleOAuthPassportOpts: StrategyOptions = {
  clientID: env.auth.googleClientId,
  clientSecret: env.auth.googleClientSecret,
  callbackURL: env.auth.googleCallbackUrl,
};

const verifyCallback = (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
  done(null, profile);
};

export const passportConfig = (passport: PassportStatic) => {
  passport.serializeUser((user, done) => {
    done(null, { id: (user as Profile).id });
  });

  passport.deserializeUser((obj: { id: string }, done) => {
    done(null, obj);
  });

  passport.use(new GoogleOAuthStrategy(GoogleOAuthPassportOpts, verifyCallback));
};
