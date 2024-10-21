import { db } from "../data";
import { establishments } from "../data/schema";
import { Establishment, NewEstablishment, EstablishmentColumns } from "../../domain/entities/Establishment";
import { eq } from "drizzle-orm";

export class EstablishmentRepository {
    
        async createEstablishment(establishment: NewEstablishment) {
            try {
                const result = await db.insert(establishments).values(establishment).returning({id :establishments.id}).execute();
                return result.length > 0 ? result[0] : undefined;;
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while creating establishment")
            }
        }
    
        updateEstablishment(establishment: Establishment) {
            try {
                return db.update(establishments).set(establishment).where(eq(establishments.id, establishment.id)).execute();
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while updating establishment")
            }
        }
    
        getAllEstablishments() {
            try {
                return db.select({
                    id: establishments.id,
                    name: establishments.name,
                    siret: establishments.siret,
                    address: establishments.address,
                    zipcode: establishments.zipcode,
                    city: establishments.city,
                    telephone: establishments.telephone
                }).from(establishments)
                .execute();
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while fetching establishments")
            }
        }
    
        getEstablishmentById(id: string, columns: EstablishmentColumns): Promise<Partial<Establishment | undefined>> {
            try {
                return db.query.establishments.findFirst({
                    where:
                        eq(establishments.id, id),
                    columns
                });
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while fetching establishment")
            }
        }

        getEstablishmentByName(name: string, columns: EstablishmentColumns): Promise<Partial<Establishment | undefined>> {
            try {
                return db.query.establishments.findFirst({
                    where:
                        eq(establishments.name, name),
                    columns
                });
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while fetching establishment")
            }
        }
    
        deleteEstablishment(id: string) {
            try {
                return db.delete(establishments).where(eq(establishments.id, id)).execute();
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while deleting establishment")
            }
        }
    
}