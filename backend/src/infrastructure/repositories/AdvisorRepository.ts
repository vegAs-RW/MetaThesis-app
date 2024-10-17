import { db } from "../data";
import { advisors, establishments, users } from "../data/schema";
import { Advisor, NewAdvisor, AdvisorColumns } from "../../domain/entities/Advisor";
import { eq } from "drizzle-orm";

export class AdvisorRepository {

    createAdvisor(advisor: NewAdvisor) {
        try {
            return db.insert(advisors).values(advisor).execute();;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while creating advisor")
        }
    }

    updateAdvisor(advisor: Advisor) {
        try {
            return db.update(advisors).set(advisor).where(eq(advisors.id, advisor.id)).execute();
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while updating advisor")
        }
    }

    getAllAdvisors() {
        try {
            return db.select({
                id: advisors.id,
                department: advisors.department,
                research_area: advisors.research_area,
                ifrs: advisors.ifrs,
                costCenter: advisors.costCenter,
                establishment: {
                    id: establishments.id,
                    name: establishments.name
                },
                users: {
                    email: users.email,
                    firstname: users.firstname,
                    lastname: users.lastname
                }
            }).from(advisors)
            .leftJoin(establishments, eq(advisors.establishment, establishments.id))
            .leftJoin(users, eq(advisors.id, users.id))
            .execute();
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching advisors")
        }
    }

    getAdvisorById(id: string, columns: AdvisorColumns): Promise<Partial<Advisor | undefined>> {
        try {
            return db.query.advisors.findFirst({
                where:
                    eq(advisors.id, id),
                columns
            });
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching advisor")
        }
    }


    getAdvisorByEmail(email: string): Promise<Partial<Advisor | undefined>> {
        try {
            return db.query.advisors.findFirst({
                columns: {
                    id: true,
                    department: true,
                    research_area: true,
                    ifrs: true,
                    costCenter: true,
                    establishment: true,
                },
                where: eq(users.email, email),
                with: {
                    user: {
                        columns: {
                            id: true,
                            email: true,
                            firstname: true,
                            lastname: true
                        }
                    }
                }
            });

        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching advisor by email");
        }
    }

    deletAdvisor(id: string) {
        try {
            return db.delete(advisors).where(eq(advisors.id, id)).execute();
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while deleting advisor")
        }
    }
}