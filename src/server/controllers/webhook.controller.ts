import { Svix, Webhook, WebhookVerificationError } from "svix";

import type { ExpressMiddleware } from "@server/types";
import { EmailAddress, WebhookEvent } from "@clerk/clerk-sdk-node";
import env from "@environments";
import { createUser, deleteUser, updateUser } from "../services/auth.service";
import { logger } from "../utils/logger";

type SvixHeadersPayload = {
  svix_id?: string;
  svix_timestamp?: string;
  svix_signature?: string;
};

export const clerkWebhookController: ExpressMiddleware = async (req, res) => {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = env.clerk.webhookSecret;
  if (!WEBHOOK_SECRET) {
    throw new Error("You need a WEBHOOK_SECRET in your .env");
  }

  // Get the headers and body
  const headers = req.headers;
  const payload = req.body;

  // Get the Svix headers for verification
  const svix_id = headers["svix-id"] as SvixHeadersPayload["svix_id"];
  const svix_timestamp = headers["svix-timestamp"] as SvixHeadersPayload["svix_timestamp"];
  const svix_signature = headers["svix-signature"] as SvixHeadersPayload["svix_signature"];

  // If there are no Svix headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ success: false, message: "Error occured -- no svix headers" });
  }

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Attempt to verify the incoming webhook
  // If successful, the payload will be available from 'evt'
  // If the verification fails, error out and  return error code
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    const err = error as WebhookVerificationError;

    logger.error("Error verifying webhook:", err.message);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const eventType = evt.type;
  const { id } = evt.data;

  if (eventType === "user.created" || eventType === "user.updated") {
    const isUpdate = eventType === "user.updated";

    const { id, first_name, last_name, username, image_url, email_addresses, primary_email_address_id } = evt.data;

    const email = email_addresses.find((em) => em.id === primary_email_address_id)?.email_address;

    if (!email) {
      logger.error("Error verifying webhook: Missing Primary Email");
      return res.status(400).json({
        success: false,
        message: "Missing Primary Email",
      });
    }

    if (isUpdate) {
      await updateUser({
        id,
        email,
        first_name,
        last_name,
        username,
        image_url,
      });
      logger.info({ userId: id }, "User updated successfullly");
    } else {
      await createUser({
        id,
        email,
        first_name,
        last_name,
        username,
        image_url,
      });
      logger.info({ userId: id }, "User created successfullly");
    }
  } else if (eventType === "user.deleted") {
    const { id, deleted } = evt.data;
    if (deleted && id) {
      await deleteUser(id);
      logger.info({ userId: id }, "User deleted successfullly");
    } else {
      logger.error("Error deleting the user: User id is missing: ", id);
      return res.status(400).json({
        success: false,
        message: "User id is missing",
      });
    }
  }

  return res.status(200).json({
    success: true,
    message: "Webhook received",
  });
};
