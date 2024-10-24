CREATE TABLE IF NOT EXISTS "candidates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lastname" varchar(255) NOT NULL,
	"firstname" varchar(255) NOT NULL,
	"birthdate" date NOT NULL,
	"last_degree" varchar(255) NOT NULL,
	"date_Last_Degree" date NOT NULL,
	"doctoral_school" varchar(255) NOT NULL,
	"resident_permit" varchar(255) NOT NULL,
	"committee_validation" boolean NOT NULL,
	"hr_validation" boolean NOT NULL,
	"zrr_validation" boolean NOT NULL,
	"advisors" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "advisors" DROP CONSTRAINT "advisors_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "directors" ALTER COLUMN "hdr" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "theses" ALTER COLUMN "vacancy" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "theses" ADD COLUMN "advisorId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "theses" ADD COLUMN "candidateId" uuid;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" varchar(255) DEFAULT 'advisor' NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "candidates" ADD CONSTRAINT "candidates_advisors_advisors_id_fk" FOREIGN KEY ("advisors") REFERENCES "public"."advisors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "advisors" ADD CONSTRAINT "advisors_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "theses" ADD CONSTRAINT "theses_advisorId_advisors_id_fk" FOREIGN KEY ("advisorId") REFERENCES "public"."advisors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "theses" ADD CONSTRAINT "theses_candidateId_candidates_id_fk" FOREIGN KEY ("candidateId") REFERENCES "public"."candidates"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
