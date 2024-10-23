import { db } from "../data";
import { candidates, advisors } from "../data/schema";
import { Candidate, NewCandidate, CandidateColumns, CandidateWithAdvisor } from "../../domain/entities/Candidate";
import { eq } from "drizzle-orm";

/**
 * Repository that manages CRUD operations for candidates
 */
export class CandidateRepository {

    /**
     * Creates a new candidate in the database
     * @param {NewCandidate} newCandidate - The candidate data to create
     * @returns {Promise<any>} - A promise containing the ID of the created candidate
     * @throws {Error} - Throws an error if there's an issue during creation
     */
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

    /**
     * Updates an existing candidate in the database
     * @param {Candidate} candidate - The candidate data with updates
     * @returns {Promise<{ rowsAffected: number }>} - A promise containing the number of rows affected by the update
     * @throws {Error} - Throws an error if the candidate ID is not provided
     */
    updateCandidate(candidate: Candidate) {
        try {
            return db.update(candidates).set(candidate).where(eq(candidates.id, candidate.id)).execute();
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while updating candidate")
        }
    }

    /**
     * Retrieves all candidates from the database
     * @returns {Promise<CandidateWithAdvisor[]>} - A promise containing a list of all candidates
     * @throws {Error} - Throws an error if there's an issue during fetching
     */
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

    /**
     * Retrieves a candidate by their ID
     * @param {string} id - The ID of the candidate to retrieve
     * @returns {Promise<any>} - A promise containing the corresponding candidate
     * @throws {Error} - Throws an error if there's an issue during fetching
     */
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

    /**
     * Retrieves a candidate by their email address
     * @param {string} advisorId - The email of the candidate to retrieve
     * @returns {Promise<CandidateWithAdvisor[]>} - A promise containing a list of candidates associated with the advisor
     * @throws {Error} - Throws an error if there's an issue during fetching
     */
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

    /**
     * Deletes a candidate from the database
     * @param {string} id - The ID of the candidate to delete
     * @returns {Promise<{ rowsAffected: number }>} - A promise containing the number of rows affected by the deletion
     * @throws {Error} - Throws an error if there's an issue during deletion
     */
    deleteCandidate(id: string) {
        try {
            return db.delete(candidates).where(eq(candidates.id, id)).execute();
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while deleting candidate")
        }
    }

}
