import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { laboratories } from "../../infrastructure/data/schema/laboratories";

export type Laboratory = InferSelectModel<typeof laboratories>;

export type NewLaboratory = InferInsertModel<typeof laboratories>;

export type LaboratoryColumns = {[K in keyof Laboratory]?:boolean};