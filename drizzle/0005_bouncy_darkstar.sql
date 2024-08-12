ALTER TYPE "role" ADD VALUE 'super_admin';--> statement-breakpoint
DROP TABLE "oauth_account";--> statement-breakpoint
DROP TABLE "session";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "display_name" TO "username";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "avatar_url" TO "image_url";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "username" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "first_name" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "last_name" text;