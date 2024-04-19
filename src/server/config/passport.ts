import { Strategy as GoogleOAuthStrategy, Profile, StrategyOptions, VerifyCallback } from "passport-google-oauth20";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import type { PassportStatic } from "passport";

import { db } from "@server/db";
import { oauthTable, userTable } from "@server/db/schema";

import env from "@environments";

const GoogleOAuthPassportOpts: StrategyOptions = {
  clientID: env.auth.googleClientId,
  clientSecret: env.auth.googleClientSecret,
  callbackURL: env.auth.googleCallbackUrl,
};

const verifyCallback = async (_accessToken: string, _refreshToken: string, profile: Profile, done: VerifyCallback) => {
  try {
    const existingUserProvider = await db.select().from(oauthTable).where(eq(oauthTable.providerUserId, profile.id));

    const userId = existingUserProvider[0]?.userId;

    if (userId) {
      done(null, { id: userId });
      return;
    }

    const newUserId = generateId(13);

    await db.insert(userTable).values({ id: newUserId, email: profile.emails![0].value, name: profile.displayName });

    await db.insert(oauthTable).values({
      providerId: profile.provider,
      providerUserId: profile.id,
      userId: newUserId,
    });

    done(null, { id: newUserId });
  } catch (error) {
    done(error as Error);
  }
};

export const passportConfig = (passport: PassportStatic) => {
  passport.use(new GoogleOAuthStrategy(GoogleOAuthPassportOpts, verifyCallback));
};
