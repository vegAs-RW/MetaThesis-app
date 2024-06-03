import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { laboratories } from './laboratories';

export const directors = pgTable('directors', {
    id: uuid('id').defaultRandom().primaryKey(),
    email: varchar('email', {length: 255}).notNull(),
    lastname: varchar('lastname', {length: 255}).notNull(),
    firstname: varchar('firstname', {length:255}).notNull(),
    phoneNumber: varchar('phoneNumber', {length: 20}).notNull(),
    address: varchar('address', {length: 255}).notNull(),
    laboratory: uuid('laboratory').references(() => laboratories.id).notNull()
})