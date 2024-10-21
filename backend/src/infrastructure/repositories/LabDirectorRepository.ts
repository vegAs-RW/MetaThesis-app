import { db } from "../data";
import { directors, laboratories } from "../data/schema";
import { LabDirector, NewLabDirector, LabDirectorColumns } from "../../domain/entities/LabDirector";
import { eq } from "drizzle-orm";


export class LabDirectorRepository {
    
        async createLabDirector(labDirector: NewLabDirector) {
            try {
                const result = await db.insert(directors).values(labDirector).returning({id :directors.id}).execute();
                return result.length > 0 ? result[0] : undefined;;
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while creating lab director")
            }
        }
    
        updateLabDirector(labDirector: LabDirector) {
            try {
                return db.update(directors).set(labDirector).where(eq(directors.id, labDirector.id)).execute();
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while updating lab director")
            }
        }
    
        getAllLabDirectors() {
            try {
                return db.select({
                    id: directors.id,
                    email: directors.email,
                    lastname: directors.lastname,
                    firstname: directors.firstname,
                    phoneNumber: directors.phoneNumber,
                    hdr: directors.hdr,
                    laboratory: {
                        name: laboratories.name,
                        city: laboratories.city,
                        country: laboratories.country,
                        address: laboratories.address,
                        means : laboratories.means,
                        expertise : laboratories.expertise
                    }
                }).from(directors)
                .leftJoin(laboratories, eq(directors.laboratory, laboratories.id))
                .execute();
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while fetching lab directors")
            }
        }
    
        getLabDirectorById(id: string, columns: LabDirectorColumns): Promise<Partial<LabDirector | undefined>> {
            try {
                return db.query.directors.findFirst({
                    where:
                        eq(directors.id, id),
                    columns
                });
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while fetching lab director")
            }
        }

        getLabDirectorByLastname(lastname: string, columns: LabDirectorColumns): Promise<Partial<LabDirector | undefined>> {
            try {
                return db.query.directors.findFirst({
                    where:
                        eq(directors.lastname, lastname),
                    columns
                });
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while fetching lab director")
            }
        }

        getLabDirectorByLabId(labId: string, columns: LabDirectorColumns): Promise<Partial<LabDirector | undefined>> { 
            try {
                return db.query.directors.findFirst({
                    where:
                        eq(directors.laboratory, labId),
                    columns
                });
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while fetching lab director")
            }
        }

        getLabDirectorByLaboratory(labId: string, columns: LabDirectorColumns): Promise<Partial<LabDirector | undefined>> {
            try {
                return db.query.directors.findFirst({
                    where:
                        eq(directors.laboratory, labId),
                        columns
                });
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while fetching lab director")
            }
        }
    }