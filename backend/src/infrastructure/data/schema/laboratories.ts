import { pgTable, uuid, varchar, text } from 'drizzle-orm/pg-core';
import { directors } from './laboratoriesDirectors';

export const laboratories = pgTable('laboratories', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', {length: 255}).notNull(),
    address: varchar('address', {length: 255}).notNull(),
    city: varchar('city', {length:255}).notNull(),
    country: varchar('country', {length: 255}).notNull(),
    means: varchar('means', {length: 255}).notNull(),
    expertise: varchar('expertise', {length:255}).notNull(),
})