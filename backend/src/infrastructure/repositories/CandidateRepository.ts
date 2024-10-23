import { db } from "../data";
import { candidates, advisors } from "../data/schema";
import { Candidate, NewCandidate, CandidateColumns, CandidateWithAdvisor } from "../../domain/entities/Candidate";
import { eq } from "drizzle-orm";

export class CandidateRepository {

    async createCandidate(newCandidate: NewCandidate) {
        try {
            return await db.insert(candidates).values(newCandidate)
            .returning({ id: candidates.id })
            .execute();
            
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

    getAllCandidates(): Promise<CandidateWithAdvisor[]> {
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
                advisor: candidates.advisor,
                advisorInfo: {
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

    getCandidateById(id: string): Promise<any> {
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
                .where(eq(candidates.id, id))
                .execute();
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching candidate")
        }
    }

    getCandidatesByAdvisor(advisorId: string): Promise<CandidateWithAdvisor[]> {
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
                advisor: candidates.advisor,
                advisorInfo: {
                    id: advisors.id,
                    department: advisors.department,
                    research_area: advisors.research_area,
                    ifrs: advisors.ifrs,
                    costCenter: advisors.costCenter
                }
            }).from(candidates)
                .leftJoin(advisors, eq(candidates.advisor, advisors.id))
                .where(eq(candidates.advisor, advisorId))
                .execute();
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching candidates");
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
