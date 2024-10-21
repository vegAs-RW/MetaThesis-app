import { db } from "../data";
import { laboratories } from "../data/schema";
import { Laboratory, NewLaboratory, LaboratoryColumns } from "../../domain/entities/Laboratory";
import { eq } from "drizzle-orm";

export class LaboratoryRepository {
    
        async createLaboratory(laboratory: NewLaboratory) {
            try {
                const result = await db.insert(laboratories).values(laboratory).returning({id :laboratories.id}).execute();
                return result.length > 0 ? result[0] : undefined;;
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while creating laboratory")
            }
        }
    
        updateLaboratory(laboratory: Laboratory) {
            try {
                return db.update(laboratories).set(laboratory).where(eq(laboratories.id, laboratory.id)).execute();
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while updating laboratory")
            }
        }
    
        getAllLaboratories() {
            try {
                return db.select({
                    id: laboratories.id,
                    name: laboratories.name,
                    address: laboratories.address,
                    city: laboratories.city,
                    country: laboratories.country,
                    means: laboratories.means,
                    expertise: laboratories.expertise,
                }).from(laboratories)
                .execute();
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while fetching laboratories")
            }
        }
    
        getLaboratoryById(id: string, columns: LaboratoryColumns): Promise<Partial<Laboratory | undefined>> {
            try {
                return db.query.laboratories.findFirst({
                    where:
                        eq(laboratories.id, id),
                    columns
                });
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while fetching laboratory")
            }
        }

        getLaboratoryByName(name: string, columns: LaboratoryColumns): Promise<Partial<Laboratory | undefined>> {
            try {
                return db.query.laboratories.findFirst({
                    where:
                        eq(laboratories.name, name),
                    columns
                });
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while fetching laboratory")
            }
        }

        getLaboratoryByCity(city: string, columns: LaboratoryColumns) {  
            try {
                return db.select({
                    id: laboratories.id,
                    name: laboratories.name,
                    address: laboratories.address,
                    city: laboratories.city,
                    country: laboratories.country,
                    means: laboratories.means,
                    expertise: laboratories.expertise,
                }).from(laboratories)
                .where(eq(laboratories.city, city))
                .execute();
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while fetching laboratory")
            }
        }
        
        getLaboratoryByCountry(country: string, columns: LaboratoryColumns) {  
            try {
                return db.select({
                    id: laboratories.id,
                    name: laboratories.name,
                    address: laboratories.address,
                    city: laboratories.city,
                    country: laboratories.country,
                    means: laboratories.means,
                    expertise: laboratories.expertise,
                }).from(laboratories)
                .where(eq(laboratories.country, country))
                .execute();
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while fetching laboratory")
            }
        }
}