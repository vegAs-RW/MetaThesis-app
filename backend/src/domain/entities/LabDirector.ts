import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { directors } from "../../infrastructure/data/schema";

export type LabDirector = InferSelectModel<typeof directors>;

export type NewLabDirector = InferInsertModel<typeof directors>;

export type LabDirectorColumns = {[K in keyof LabDirector]?:boolean};

