import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { users } from "../../infrastructure/data/schema/users";

export type User = InferSelectModel<typeof users>;

export type InsertUser = InferInsertModel<typeof users>;

export type UserColumns = {[K in keyof User]?:boolean};