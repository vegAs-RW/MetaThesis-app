import { boolean, pgTable, smallint, text, uuid, varchar } from "drizzle-orm/pg-core";
import { advisors } from "./advisors";
import { candidates } from "./candidates";
import { laboratories } from "./laboratories";

export const theses = pgTable('theses', {
    id: uuid('id').defaultRandom().primaryKey(),
    topic: varchar('topic', {length: 255}).notNull(),
    year: smallint('year').notNull(),
    domain: text('domain').notNull(),
    scientistInterest: varchar('scientistInterest', {length: 255}).notNull(),
    keyword: varchar('keyword', {length: 255}).notNull(),
    vacancy: varchar('vacancy', {length: 25}),
    topicValidation: boolean('topicValidation'),
    anrtNumber: varchar('anrtNumber', {length:25}),
    refusedTopic: varchar('refusedTopic', {length: 25}),
    advisorId: uuid('advisorId').references(() => advisors.id).notNull(),
    candidateId: uuid('candidateId').references(() => candidates.id),
    laboratoryId: uuid('laboratoryId').references(() => laboratories.id, {onDelete: 'set null'})
})