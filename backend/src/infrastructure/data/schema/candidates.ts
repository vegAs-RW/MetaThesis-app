
import { pgTable, uuid, varchar, date, boolean } from "drizzle-orm/pg-core";
import { advisors } from "./advisors";

export const candidates = pgTable("candidates", {
    id: uuid("id").defaultRandom().primaryKey(),
    lastname: varchar("lastname", { length: 255 }).notNull(),
    firstname: varchar("firstname", { length: 255 }).notNull(),
    birthdate: date("birthdate").notNull(),
    lastDegree: varchar("last_degree", { length: 255 }).notNull(),
    dateLastDegree: date("date_Last_Degree").notNull(),
    doctoralSchool: varchar("doctoral_school", { length: 255 }).notNull(),
    residentPermit: varchar("resident_permit", { length: 255 }).notNull(),
    committeeValidation: boolean("committee_validation").notNull(),  
    hrValidation: boolean("hr_validation").notNull(),
    zrrValidation: boolean("zrr_validation").notNull(),
    advisor: uuid("advisors").references(() => advisors.id).notNull(),
    });