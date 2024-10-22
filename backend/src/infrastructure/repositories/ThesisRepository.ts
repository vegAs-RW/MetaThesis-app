import { db } from "../data";
import { theses, users, advisors, establishments, candidates } from "../data/schema";
import { Thesis, NewThesis, ThesisColumns, ThesisWithRelations } from "../../domain/entities/Thesis";
import { eq, ilike } from "drizzle-orm";


export class ThesisRepository {

    async createInitialThesis(thesis: Partial<NewThesis>, advisorId: string) {
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
                    advisorId: advisorId,
                    candidateId: thesis.candidateId || null,
                    vacancy: thesis.vacancy || null,
                    topicValidation: thesis.topicValidation || false,
                    anrtNumber: thesis.anrtNumber || null,
                    refusedTopic: thesis.refusedTopic || null
                })
                .returning({ id: theses.id })
                .execute();
            return result.length > 0 ? result[0] : undefined;;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while creating thesis")
        }
    }

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

    async getAllTheses(columns: ThesisColumns, filters: {keyword?: string, year?: number, domain?: string, topicValidation?: boolean} = {}) {
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
                },
                candidate: {
                    id: candidates.id,
                    firstname: candidates.firstname,
                    lastname: candidates.lastname
                }
            })
                .from(theses)
                .leftJoin(advisors, eq(theses.advisorId, advisors.id))
                .leftJoin(candidates, eq(theses.candidateId, candidates.id))

                if (filters.keyword) {
                    query.where(ilike(theses.keyword, `%${filters.keyword}%`));
                }
                if (filters.year) {
                    query.where(eq(theses.year, filters.year));
                }
                if (filters.domain) {
                    query.where(ilike(theses.domain, `%${filters.domain}%`));
                }
                if (filters.topicValidation !== undefined) {
                    query.where(eq(theses.topicValidation, filters.topicValidation));
                }
            return await query.execute();
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching theses")
        }
    }

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
}
