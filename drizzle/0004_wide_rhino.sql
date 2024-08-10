CREATE TABLE IF NOT EXISTS "palette" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"user_id" text NOT NULL,
	"max_shades" integer NOT NULL,
	"primary_shade" integer NOT NULL,
	"colors" jsonb[] NOT NULL,
	"is_public" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"updatedAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "palette" ADD CONSTRAINT "palette_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
