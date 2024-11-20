ALTER TABLE "directors" DROP CONSTRAINT "directors_laboratory_laboratories_id_fk";
--> statement-breakpoint
ALTER TABLE "theses" ADD COLUMN "laboratoryId" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directors" ADD CONSTRAINT "directors_laboratory_laboratories_id_fk" FOREIGN KEY ("laboratory") REFERENCES "public"."laboratories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "theses" ADD CONSTRAINT "theses_laboratoryId_laboratories_id_fk" FOREIGN KEY ("laboratoryId") REFERENCES "public"."laboratories"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
