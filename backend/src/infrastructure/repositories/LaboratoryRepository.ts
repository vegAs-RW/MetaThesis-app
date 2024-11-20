import { db } from "../data";
import { laboratories } from "../data/schema";
import { Laboratory, NewLaboratory, LaboratoryColumns } from "../../domain/entities/Laboratory";
import { eq } from "drizzle-orm";

/**
 * Repository class for managing Laboratory CRUD operations.
 */
export class LaboratoryRepository {

    /**
 * Creates a new Laboratory.
 * @param {NewLaboratory} laboratory - The new laboratory data.
 * @returns {Promise<Laboratory>} - The newly created laboratory.
 * @throws {Error} - Throws an error if creation fails.
 */
    async createLaboratory(laboratory: NewLaboratory) {
        try {
            const result = await db.insert(laboratories).values(laboratory).returning({ id: laboratories.id }).execute();
            if (result.length === 0) throw new Error("An error occurred while creating laboratory");
            return result[0];
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while creating laboratory")
        }
    }

    /**
* Updates an existing Laboratory's information.
* @param {Laboratory} laboratory - The updated laboratory data.
* @returns {Promise<void>} - A promise indicating that the update was successful.
* @throws {Error} - Throws an error if the update fails.
*/
    updateLaboratory(laboratory: Laboratory) {
        try {
            return db.update(laboratories).set(laboratory).where(eq(laboratories.id, laboratory.id)).execute();
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while updating laboratory")
        }
    }

    /**
 * Fetches all Laboratories.
 * @returns {Promise<Laboratory[]>} - A promise containing all laboratories.
 * @throws {Error} - Throws an error if fetching fails.
 */
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

    /**
 * Fetches a Laboratory by its ID.
 * @param {string} id - The laboratory's ID.
 * @param {LaboratoryColumns} columns - The columns to retrieve.
 * @returns {Promise<Partial<Laboratory | undefined>>} - The laboratory data or undefined if not found.
 * @throws {Error} - Throws an error if fetching fails.
 */
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

    /**
 * Fetches a Laboratory by its name.
 * @param {string} name - The laboratory's name.
 * @param {LaboratoryColumns} columns - The columns to retrieve.
 * @returns {Promise<Partial<Laboratory | undefined>>} - The laboratory data or undefined if not found.
 * @throws {Error} - Throws an error if fetching fails.
 */
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

    /**
 * Fetches Laboratories by their city.
 * @param {string} city - The city name.
 * @param {LaboratoryColumns} columns - The columns to retrieve.
 * @returns {Promise<Laboratory[]>} - An array of laboratories in the specified city.
 * @throws {Error} - Throws an error if fetching fails.
 */
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

    /**
* Fetches Laboratories by their country.
* @param {string} country - The country name.
* @param {LaboratoryColumns} columns - The columns to retrieve.
* @returns {Promise<Laboratory[]>} - An array of laboratories in the specified country.
* @throws {Error} - Throws an error if fetching fails.
*/
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

    /**
    * Deletes a laboratory by its ID.
    * @param {string} id - The ID of the laboratory to delete.
    * @returns {Promise<void>} - A promise indicating that the laboratory has been deleted.
    * @throws {Error} - Throws an error if there's an issue during deletion.
    */
    deleteLaboratory(id: string): void {
        try {
            db.delete(laboratories).where(eq(laboratories.id, id)).execute();
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while deleting laboratory")
        }
    }

}




 /**
    * Deletes an establishment by its ID.
    * @param {string} id - The ID of the establishment to delete.
    * @returns {Promise<void>} - A promise indicating that the establishment has been deleted.
    * @throws {Error} - Throws an error if there's an issue during deletion.
    */
 