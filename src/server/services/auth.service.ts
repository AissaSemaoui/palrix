import { User } from "@clerk/clerk-sdk-node";
import { eq } from "drizzle-orm";

import { db } from "@server/db";
import { users } from "@server/db/schema";

import type { WithRequired } from "@/types";

type UserDraft = {
  id: User["id"];
  email: User["emailAddresses"][number]["emailAddress"];
  first_name: User["firstName"];
  last_name: User["lastName"];
  username: User["username"];
  image_url: User["imageUrl"];
};

export const createUser = async (payload: UserDraft) => {
  const response = await db.insert(users).values(payload);

  console.log(response);

  return response;
};

export const updateUser = async (payload: WithRequired<Partial<UserDraft>, "id">) => {
  const response = await db.update(users).set(payload).where(eq(users.id, payload.id));

  console.log(response);

  return response;
};

export const deleteUser = async (userId: UserDraft["id"]) => {
  const response = await db.delete(users).where(eq(users.id, userId));

  console.log(response);

  return response;
};

export const getUser = async (userId: UserDraft["id"]) => {
  const [user] = await db.select().from(users).where(eq(users.id, userId));

  return user;
};
