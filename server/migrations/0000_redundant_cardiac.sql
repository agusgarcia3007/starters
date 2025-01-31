CREATE TABLE IF NOT EXISTS "users_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"password" text NOT NULL,
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
