import { Strategy as GoogleOAuthStrategy, Profile, StrategyOptions, VerifyCallback } from "passport-google-oauth20";
import { eq } from "drizzle-orm";
import type { PassportStatic } from "passport";

import { db } from "@server/db";
import { auth_providers, users } from "@server/db/schema";
import { createId } from "@server/utils/generics";
import env from "@environments";

import { UserRoles } from "@server/types";

const GoogleOAuthPassportOpts: StrategyOptions = {
  clientID: env.auth.googleClientId,
  clientSecret: env.auth.googleClientSecret,
  callbackURL: env.auth.googleCallbackUrl,
};

const verifyCallback = async (_accessToken: string, _refreshToken: string, profile: Profile, done: VerifyCallback) => {
  try {
    const existingUserProvider = await db
      .select()
      .from(auth_providers)
      .where(eq(auth_providers.providerUserId, profile.id));

    const userId = existingUserProvider[0]?.userId;

    if (userId) {
      const userData = await db.select().from(users).where(eq(users.id, userId));

      if (userData.length === 0) {
        done(new Error("User not found"));
        return;
      }

      done(null, userData[0]);
      return;
    }

    if (!userId) {
      const newUserId = createId();
      const newUser = {
        id: newUserId,
        email: profile.emails![0].value,
        displayName: profile.displayName,
        avatar_url: profile.photos?.[0].value || null,
        role: UserRoles.USER,
      };

      await db.insert(users).values(newUser);

      await db.insert(auth_providers).values({
        providerId: profile.provider,
        providerUserId: profile.id,
        userId: newUserId,
      });

      done(null, newUser);
    }
  } catch (error) {
    done(error as Error);
  }
};

export const passportConfig = (passport: PassportStatic) => {
  passport.use(new GoogleOAuthStrategy(GoogleOAuthPassportOpts, verifyCallback));
};
