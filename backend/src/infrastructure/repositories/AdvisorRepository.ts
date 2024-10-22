import { db } from "../data";
import { advisors, establishments, users } from "../data/schema";
import { Advisor, NewAdvisor, AdvisorColumns } from "../../domain/entities/Advisor";
import { eq } from "drizzle-orm";

export class AdvisorRepository {

    async createAdvisor(advisor: NewAdvisor): Promise<string | undefined> {
        try {
            const result = await db.insert(advisors).values(advisor).returning({ id: advisors.id }).execute();
            return result.length > 0 ? result[0].id : undefined;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while creating advisor")
        }
    }

    async updateAdvisor(advisor: Partial<Advisor>): Promise<void> {
        if (!advisor.id) throw new Error("Advisor id is required");
        try {
            await db.update(advisors).set(advisor).where(eq(advisors.id, advisor.id)).execute();
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while updating advisor")
        }
    }

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

    async deleteAdvisor(id: string): Promise<void> {
        try {
            await db.delete(advisors).where(eq(advisors.id, id)).execute();
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while deleting advisor")
        }
    }
}