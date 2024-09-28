ALTER TABLE "palette" ALTER COLUMN "name" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "palette" ADD COLUMN "description" text DEFAULT '' NOT NULL;