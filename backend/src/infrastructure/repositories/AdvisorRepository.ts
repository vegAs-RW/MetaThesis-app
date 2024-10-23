import { db } from "../data";
import { advisors, establishments, users } from "../data/schema";
import { Advisor, NewAdvisor, AdvisorColumns } from "../../domain/entities/Advisor";
import { eq } from "drizzle-orm";

/**
 * Repository that manages CRUD operations for advisors
 */
export class AdvisorRepository {

    /**
     * Creates a new advisor in the database
     * @param {NewAdvisor} advisor - The advisor data to create
     * @returns {Promise<string | undefined>} - A promise containing the ID of the created advisor or undefined if not created
     */
    async createAdvisor(advisor: NewAdvisor): Promise<string | undefined> {
        try {
            const result = await db.insert(advisors).values(advisor).returning({ id: advisors.id }).execute();
            return result.length > 0 ? result[0].id : undefined;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while creating advisor")
        }
    }

    /**
    * Updates an existing advisor in the database
    * @param {Partial<Advisor>} advisor - The advisor data with updates
    * @returns {Promise<void>} - A promise indicating that the advisor has been updated
    * @throws {Error} - Throws an error if the advisor ID is not provided
    */
    async updateAdvisor(advisor: Partial<Advisor>): Promise<void> {
        if (!advisor.id) throw new Error("Advisor id is required");
        try {
            await db.update(advisors).set(advisor).where(eq(advisors.id, advisor.id)).execute();
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while updating advisor")
        }
    }

    /**
    * Retrieves all advisors from the database
    * @returns {Promise<Advisor[]>} - A promise containing a list of all advisors
    */
    async getAllAdvisors(): Promise<Advisor[]> {
        try {
            const result = await db.select({
                id: advisors.id,
                department: advisors.department,
                research_area: advisors.research_area,
                ifrs: advisors.ifrs,
                costCenter: advisors.costCenter,
                establishment: advisors.establishment,
                email: users.email,
                firstname: users.firstname,
                lastname: users.lastname,
                password: users.password,
                role: users.role

            }).from(advisors)
                .leftJoin(establishments, eq(advisors.establishment, establishments.id))
                .leftJoin(users, eq(advisors.id, users.id))
                .execute();

            return result as Advisor[];
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching advisors")
        }
    }

    /**
    * Retrieves an advisor by their ID
    * @param {string} id - The ID of the advisor to retrieve
    * @param {AdvisorColumns} columns - The columns to select
    * @returns {Promise<Partial<Advisor | undefined>>} - A promise containing the corresponding advisor or undefined
    */
    async getAdvisorById(id: string, columns: AdvisorColumns): Promise<Partial<Advisor | undefined>> {
        try {
            const advisor = await db.query.advisors.findFirst({
                where:
                    eq(advisors.id, id),
                columns
            });
            return advisor
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching advisor")
        }
    }

    /**
    * Retrieves an advisor by their email address
    * @param {string} email - The email of the advisor to retrieve
    * @param {AdvisorColumns} columns - The columns to select
    * @returns {Promise<Partial<Advisor | null>>} - A promise containing the corresponding advisor or null if not found
    */
    async getAdvisorByEmail(email: string, columns: AdvisorColumns) {
        try {
            const advisor = await db.select({
                id: advisors.id,
                department: advisors.department,
                research_area: advisors.research_area,
                ifrs: advisors.ifrs,
                costCenter: advisors.costCenter,
                establishment: advisors.establishment,
                email: users.email,
                firstname: users.firstname,
                lastname: users.lastname

            }).from(advisors)
                .leftJoin(establishments, eq(advisors.establishment, establishments.id))
                .leftJoin(users, eq(advisors.id, users.id))
                .where(eq(users.email, email))
                .execute();
            return advisor.length > 0 ? advisor[0] : null;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching advisor by email");
        }
    }

    /**
    * Deletes an advisor by their ID
    * @param {string} id - The ID of the advisor to delete
    * @returns {Promise<void>} - A promise indicating that the advisor has been deleted
    */
    async deleteAdvisor(id: string): Promise<void> {
        try {
            await db.delete(advisors).where(eq(advisors.id, id)).execute();
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while deleting advisor")
        }
    }
}