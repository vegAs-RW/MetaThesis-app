CREATE TABLE IF NOT EXISTS "advisors" (
	"id" uuid PRIMARY KEY NOT NULL,
	"establishment" uuid NOT NULL,
	"department" varchar(255) NOT NULL,
	"research_area" text NOT NULL,
	"ifrs" varchar(255) NOT NULL,
	"costCenter" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"lastname" varchar(255) NOT NULL,
	"firstname" varchar(255) NOT NULL,
	"phoneNumber" varchar(20) NOT NULL,
	"hdr" boolean,
	"laboratory" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "establishments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"siret" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"zipcode" varchar(10) NOT NULL,
	"city" varchar(255) NOT NULL,
	"telephone" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "laboratories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"country" varchar(255) NOT NULL,
	"means" varchar(255) NOT NULL,
	"expertise" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "theses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"topic" varchar(255) NOT NULL,
	"year" smallint NOT NULL,
	"domain" text NOT NULL,
	"scientistInterest" varchar(255) NOT NULL,
	"keyword" varchar(255) NOT NULL,
	"vacancy" varchar(25) NOT NULL,
	"topicValidation" boolean,
	"anrtNumber" varchar(25),
	"refusedTopic" varchar(25)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lastname" varchar(255) NOT NULL,
	"firstname" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "advisors" ADD CONSTRAINT "advisors_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "advisors" ADD CONSTRAINT "advisors_establishment_establishments_id_fk" FOREIGN KEY ("establishment") REFERENCES "public"."establishments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directors" ADD CONSTRAINT "directors_laboratory_laboratories_id_fk" FOREIGN KEY ("laboratory") REFERENCES "public"."laboratories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
