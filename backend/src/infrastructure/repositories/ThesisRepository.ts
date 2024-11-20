import { db } from "../data";
import { theses, users, advisors, establishments, candidates, laboratories } from "../data/schema";
import { Thesis, NewThesis, ThesisColumns, ThesisWithRelations } from "../../domain/entities/Thesis";
import { eq, ilike, and, or } from "drizzle-orm";

/**
 * Repository that manages CRUD operations for theses
 */
export class ThesisRepository {

    /**
     * Creates an initial thesis in the database
     * @param {Partial<NewThesis>} thesis - The thesis data to create
     * @param {string} advisorId - The ID of the advisor associated with the thesis
     * @returns {Promise<Thesis>} - A promise containing the created thesis
     */
    async createInitialThesis(thesis: Partial<NewThesis>) {
        try {
            if (!thesis.topic || !thesis.year || !thesis.domain || !thesis.scientistInterest || !thesis.keyword || !thesis.advisorId) {
                throw new Error("Missing required fields: topic, year, domain, scientistInterest, keyword, or advisorId");
            }

            const result = await db.insert(theses)
                .values({
                    topic: thesis.topic,
                    year: thesis.year,
                    domain: thesis.domain,
                    scientistInterest: thesis.scientistInterest,
                    keyword: thesis.keyword,
                    advisorId: thesis.advisorId,
                    candidateId: thesis.candidateId || null,
                    vacancy: thesis.vacancy || null,
                    topicValidation: thesis.topicValidation || false,
                    anrtNumber: thesis.anrtNumber || null,
                    refusedTopic: thesis.refusedTopic || null,
                    laboratoryId: thesis.laboratoryId || null
                })
                .returning({ id: theses.id })
                .execute();
            return result.length > 0 ? result[0] : undefined;;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while creating thesis")
        }
    }

    /**
     * Validates the topic of a thesis
     * @param {string} thesisId - The ID of the thesis to validate
     * @param {boolean} isValid - Indicates if the topic is valid or not
     * @param {string} [refusedTopic] - The refused topic if the subject is not valid
     * @returns {Promise<{ rowsAffected: number }>} - A promise containing the result of the update
     */
    async validateThesisTopic(thesisId: string, isValid: boolean, refusedTopic?: string) {
        try {
            const result = await db.update(theses)
                .set({
                    topicValidation: isValid,
                    refusedTopic: !isValid && refusedTopic ? refusedTopic : null
                })
                .where(eq(theses.id, thesisId))
                .execute();
            return result;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while validating thesis topic")
        }
    }

    /**
     * Updates the job vacancy associated with a thesis
     * @param {string} thesisId - The ID of the thesis to update
     * @param {string} vacancy - The new job vacancy to associate with the thesis
     * @returns {Promise<void>} - A promise indicating that the vacancy has been updated
     */
    async updateJobVacancy(thesisId: string, vacancy: string) {
        try {
            const result = await db.update(theses)
                .set({
                    vacancy
                })
                .where(eq(theses.id, thesisId))
                .execute();
            return result;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while updating job vacancy")
        }
    }

    /**
     * Assigns a candidate to a thesis
     * @param {string} thesisId - The ID of the thesis to which the candidate will be assigned
     * @param {string} candidateId - The ID of the candidate to assign
     * @returns {Promise<void>} - A promise indicating that the candidate has been assigned
     */
    async assignCandidateToThesis(thesisId: string, candidateId: string) {
        try {
            const result = await db.update(theses)
                .set({
                    candidateId
                })
                .where(eq(theses.id, thesisId))
                .execute();
            return result;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while assigning candidate to thesis")
        }
    }

    /**
     * Adds an ANRT number to a thesis
     * @param {string} thesisId - The ID of the thesis to update
     * @param {string} anrtNumber - The ANRT number to associate with the thesis
     * @returns {Promise<void>} - A promise indicating that the ANRT number has been added
     */
    async addAnrtNumberToThesis(thesisId: string, anrtNumber: string) {
        try {
            const result = await db.update(theses)
                .set({
                    anrtNumber
                })
                .where(eq(theses.id, thesisId))
                .execute();
            return result;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while adding ANRT number to thesis")
        }
    }

    /**
     * Retrieves all theses with optional columns and filters
     * @param {ThesisColumns} columns - The columns to select
     * @param {{keyword?: string, year?: number, domain?: string, topicValidation?: boolean}} filters - The search filters
     * @returns {Promise<Thesis[]>} - A promise containing the list of theses matching the criteria
     */
    async getAllTheses(columns: ThesisColumns, filters: {keyword?: string, year?: number, domain?: string, advisorName?: string}) {
        try {
            const query =  db.select({
                id: theses.id,
                topic: theses.topic,
                year: theses.year,
                domain: theses.domain,
                scientistInterest: theses.scientistInterest,
                keyword: theses.keyword,
                vacancy: theses.vacancy,
                topicValidation: theses.topicValidation,
                anrtNumber: theses.anrtNumber,
                refusedTopic: theses.refusedTopic,
                advisor: {
                    id: advisors.id,
                    department: advisors.department,
                    research_area: advisors.research_area,
                    ifrs: advisors.ifrs,
                    costCenter: advisors.costCenter,
                    firstname: users.firstname,
                    lastname: users.lastname,
                },
                candidate: {
                    id: candidates.id,
                    firstname: candidates.firstname,
                    lastname: candidates.lastname
                },
                laboratory: {
                    id: laboratories.id,
                    name: laboratories.name,
                    address: laboratories.address,
                    city: laboratories.city,
                    country: laboratories.country,
                    means: laboratories.means,
                    expertise: laboratories.expertise
                }
            })
                .from(theses)
                .leftJoin(advisors, eq(theses.advisorId, advisors.id))
                .leftJoin(candidates, eq(theses.candidateId, candidates.id))
                .leftJoin(users, eq(advisors.id, users.id))
                .leftJoin(laboratories, eq(theses.laboratoryId, laboratories.id));
                const conditions = [];

                if (filters.keyword) {
                    conditions.push(ilike(theses.keyword, `%${filters.keyword}%`));
                }
                if (filters.year) {
                    conditions.push(eq(theses.year, filters.year));
                }
                if (filters.domain) {
                    conditions.push(ilike(theses.domain, `%${filters.domain}%`));
                }

                if (filters.advisorName) {
                    conditions.push(or(
                        ilike(users.firstname, `%${filters.advisorName}%`),
                        ilike(users.lastname, `%${filters.advisorName}%`)
                    ));
                }
               
                // Si des conditions sont présentes, les ajouter à la requête avec AND
                if (conditions.length > 0) {
                    query.where(and(...conditions));
                }
                
            return await query.execute();
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching theses")
        }
    }

    /**
     * Retrieves a thesis by its ID
     * @param {string} id - The ID of the thesis to retrieve
     * @param {ThesisColumns} columns - The columns to select
     * @returns {Promise<Partial<Thesis | undefined>>} - A promise containing the corresponding thesis or undefined
     */
    getThesisById(id: string, columns: ThesisColumns) {
        try {
            return db.query.theses.findFirst({
                where:
                    eq(theses.id, id),
                columns
            });
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching thesis")
        }
    }

    async getThesesByAdvisorId(advisorId: string): Promise<Thesis[]> {
        try {
            const thesesList = await db
                .select({
                    id: theses.id,
                    topic: theses.topic,
                    year: theses.year,
                    domain: theses.domain,
                    scientistInterest: theses.scientistInterest,
                    keyword: theses.keyword,
                    vacancy: theses.vacancy,
                    topicValidation: theses.topicValidation,
                    anrtNumber: theses.anrtNumber,
                    refusedTopic: theses.refusedTopic,
                    advisorId: theses.advisorId,
                    candidateId: theses.candidateId,
                    laboratoryId: theses.laboratoryId
                })
                .from(theses)
                .where(eq(theses.advisorId, advisorId))
                .execute();
    
            return thesesList; // Retourne toutes les thèses associées à l'advisor
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching theses by advisor ID");
        }
    }

     /**
     * Updates the laboratory associated with a thesis
     * @param {string} thesisId - The ID of the thesis to update
     * @param {string | null} laboratoryId - The new laboratory ID to associate, or null to remove the association
     * @returns {Promise<void>} - A promise indicating that the laboratory has been updated
     */
     async updateThesisLaboratory(thesisId: string, laboratoryId: string | null) {
        try {
            const result = await db.update(theses)
                .set({
                    laboratoryId
                })
                .where(eq(theses.id, thesisId))
                .execute();
            return result;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while updating thesis laboratory");
        }
    }
}
