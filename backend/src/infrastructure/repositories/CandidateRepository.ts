import { db } from "../data";
import { candidates, advisors } from "../data/schema";
import { Candidate, NewCandidate, CandidateColumns } from "../../domain/entities/Candidate";
import { eq } from "drizzle-orm";

export class CandidateRepository {

    async createCandidate(candidate: NewCandidate) {
        try {
            const result = await db.insert(candidates).values(candidate).returning({ id: candidates.id }).execute();
            return result.length > 0 ? result[0] : undefined;;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while creating candidate")
        }
    }

    updateCandidate(candidate: Candidate) {
        try {
            return db.update(candidates).set(candidate).where(eq(candidates.id, candidate.id)).execute();
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while updating candidate")
        }
    }

    getAllCandidates() {
        try {
            return db.select({
                id: candidates.id,
                firstname: candidates.firstname,
                lastname: candidates.lastname,
                birthdate: candidates.birthdate,
                lastDegree: candidates.lastDegree,
                dateLastDegree: candidates.dateLastDegree,
                doctoralSchool: candidates.doctoralSchool,
                residentPermit: candidates.residentPermit,
                committeeValidation: candidates.committeeValidation,
                hrValidation: candidates.hrValidation,
                zrrValidation: candidates.zrrValidation,
                advisor: {
                    id: advisors.id,
                    department: advisors.department,
                    research_area: advisors.research_area,
                    ifrs: advisors.ifrs,
                    costCenter: advisors.costCenter
                }
            }).from(candidates)
                .leftJoin(advisors, eq(candidates.advisor, advisors.id))
                .execute();
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching candidates")
        }
    }

    getCandidateById(id: string, columns: CandidateColumns): Promise<Partial<Candidate | undefined>> {
        try {
            return db.query.candidates.findFirst({
                where:
                    eq(candidates.id, id),
                columns
            });
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching candidate")
        }
    }

    getCandidateByAdvisor(advisor: string, columns: CandidateColumns): Promise<Partial<Candidate | undefined>> {
        try {
            return db.query.candidates.findFirst({
                where:
                    eq(candidates.advisor, advisor),
                columns
            });
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching candidate")
        }
    }

    deleteCandidate(id: string) {
        try {
            return db.delete(candidates).where(eq(candidates.id, id)).execute();
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while deleting candidate")
        }
    }

}
