import { pgTable, uuid, varchar, text } from 'drizzle-orm/pg-core';
import { users } from './users';
import { establishments } from './establishments';

export const advisors = pgTable('advisors', {
    id: uuid('id').references(() => users.id).notNull().primaryKey(), // Utiliser la même clé primaire que users
    establishment: uuid('establishment').references(() => establishments.id).notNull(),
    department: varchar('department', { length: 255 }).notNull(),
    research_area: text('research_area').notNull(),
    manager: varchar('manager', {length:255}).notNull()
});