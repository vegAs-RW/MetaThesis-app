import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { advisors } from "../../infrastructure/data/schema/advisors";
import { User } from "./User";

export type Advisor = InferSelectModel<typeof advisors> & User;

export type NewAdvisor = InferInsertModel<typeof advisors> & Omit<User, 'id'>;

export type AdvisorColumns = {[K in keyof Advisor]?:boolean};