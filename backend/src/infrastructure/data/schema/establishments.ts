import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const establishments = pgTable('establishments', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', {length: 255}).notNull(),
    siret: varchar('siret', {length: 255}).notNull(),
    address: varchar('address', {length: 255}).notNull(),
    zipcode: varchar('zipcode', {length: 10}).notNull(),
    city: varchar('city', {length: 255}).notNull(),
    telephone: varchar('telephone', {length: 255}).notNull()
})