import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { theses } from "../../infrastructure/data/schema";

export type Thesis = InferSelectModel<typeof theses>;

export type NewThesis = InferInsertModel<typeof theses>;

export type ThesisColumns = {[K in keyof Thesis]?:boolean};

export interface ThesisWithRelations {
    id : string;
    topic: string;
    year: number;
    domain: string;
    scientistInterest: string;
    keyword: string;
    vacancy?: string | null;
    topicValidation?: boolean;
    anrtNumber?: string | null;
    refusedTopic?: string | null;
    advisor: {
        id: string;
        department: string;
        research_area: string;
        ifrs: string;
        costCenter: string;
        establishment: {
            id: string;
            name: string;
        };
        user: {
            email: string;
            firstname: string;
            lastname: string;
        };
    };
    candidate?: {
        id: string;
        firstName: string;
        lastName: string;
    };
    laboratory?: {
        id: string;
        name: string;
        address: string;
        city: string;
        country: string;
        means: string;
        expertise: string;
    };
}

