import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { advisors } from "../../infrastructure/data/schema/advisors";

export type Advisor = InferSelectModel<typeof advisors>;

export type NewAdvisor = InferInsertModel<typeof advisors>;

export type AdvisorColumns = {[K in keyof Advisor]?:boolean};