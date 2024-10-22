import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    lastname: varchar('lastname', {length: 255}).notNull(),
    firstname: varchar('firstname', {length: 255}).notNull(),
    email: varchar('email', {length: 255}).notNull(),
    password: varchar('password', {length: 255}).notNull(),
    role: varchar('role', {length: 255}).notNull().default('advisor')
})