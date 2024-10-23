import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { candidates } from "../../infrastructure/data/schema";

export type Candidate = InferSelectModel<typeof candidates>;

export type NewCandidate = InferInsertModel<typeof candidates>;

export type CandidateColumns = {[K in keyof Candidate]?:boolean};

export type CandidateWithAdvisor = Candidate & {advisorInfo: {department: string, research_area: string, ifrs: string, costCenter: string} | null};
