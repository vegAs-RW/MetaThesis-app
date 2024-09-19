import { boolean, pgTable, smallint, text, uuid, varchar } from "drizzle-orm/pg-core";

export const theses = pgTable('theses', {
    id: uuid('id').defaultRandom().primaryKey(),
    topic: varchar('topic', {length: 255}).notNull(),
    year: smallint('year').notNull(),
    domain: text('domain').notNull(),
    scientistInterest: varchar('scientistInterest', {length: 255}).notNull(),
    keyword: varchar('keyword', {length: 255}).notNull(),
    vacancy: varchar('vacancy', {length: 25}).notNull(),
    topicValidation: boolean('topicValidation'),
    anrtNumber: varchar('anrtNumber', {length:25}),
    refusedTopic: varchar('refusedTopic', {length: 25})
})