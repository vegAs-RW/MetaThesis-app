import { pgTable, uuid, varchar, boolean } from 'drizzle-orm/pg-core';
import { laboratories } from './laboratories';


export const directors = pgTable('directors', {
    id: uuid('id').defaultRandom().primaryKey(),
    email: varchar('email', {length: 255}).notNull(),
    lastname: varchar('lastname', {length: 255}).notNull(),
    firstname: varchar('firstname', {length:255}).notNull(),
    phoneNumber: varchar('phoneNumber', {length: 20}).notNull(),
    hdr: boolean('hdr').notNull(),
    laboratory: uuid('laboratory').references(() => laboratories.id, { onDelete: 'cascade' }).notNull()
})