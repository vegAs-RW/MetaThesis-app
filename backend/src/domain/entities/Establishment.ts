import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { establishments } from "../../infrastructure/data/schema/establishments";

export type Establishment = InferSelectModel<typeof establishments>;

export type NewEstablishment = InferInsertModel<typeof establishments>;

export type EstablishmentColumns = {[K in keyof Establishment]?:boolean};

