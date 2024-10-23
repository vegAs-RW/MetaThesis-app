import { db } from "../data";
import { establishments } from "../data/schema";
import { Establishment, NewEstablishment, EstablishmentColumns } from "../../domain/entities/Establishment";
import { eq } from "drizzle-orm";

/**
 * Repository that manages CRUD operations for establishments.
 */
export class EstablishmentRepository {

    /**
     * Creates a new establishment in the database.
     * @param {NewEstablishment} establishment - The establishment data to create.
     * @returns {Promise<Establishment | undefined>} - A promise containing the created establishment or undefined if creation fails.
     * @throws {Error} - Throws an error if there's an issue during creation.
     */
    async createEstablishment(establishment: NewEstablishment) {
        try {
            const result = await db.insert(establishments).values(establishment).returning({ id: establishments.id }).execute();
            return result.length > 0 ? result[0] : undefined;;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while creating establishment")
        }
    }

    /**
     * Updates an existing establishment in the database.
     * @param {Establishment} establishment - The establishment data with updates.
     * @returns {Promise<void>} - A promise indicating that the establishment has been updated.
     * @throws {Error} - Throws an error if there's an issue during the update.
     */
    updateEstablishment(establishment: Establishment) {
        try {
            return db.update(establishments).set(establishment).where(eq(establishments.id, establishment.id)).execute();
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while updating establishment")
        }
    }

    /**
     * Retrieves all establishments from the database.
     * @returns {Promise<Establishment[]>} - A promise containing a list of all establishments.
     * @throws {Error} - Throws an error if there's an issue during fetching.
     */
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

    /**
     * Retrieves an establishment by its ID.
     * @param {string} id - The ID of the establishment to retrieve.
     * @param {EstablishmentColumns} columns - The specific columns to retrieve from the establishment.
     * @returns {Promise<Partial<Establishment | undefined>>} - A promise containing the establishment data or undefined if not found.
     * @throws {Error} - Throws an error if there's an issue during fetching.
     */
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

    /**
     * Retrieves an establishment by its name.
     * @param {string} name - The name of the establishment to retrieve.
     * @param {EstablishmentColumns} columns - The specific columns to retrieve from the establishment.
     * @returns {Promise<Partial<Establishment | undefined>>} - A promise containing the establishment data or undefined if not found.
     * @throws {Error} - Throws an error if there's an issue during fetching.
     */
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

    /**
    * Deletes an establishment by its ID.
    * @param {string} id - The ID of the establishment to delete.
    * @returns {Promise<void>} - A promise indicating that the establishment has been deleted.
    * @throws {Error} - Throws an error if there's an issue during deletion.
    */
    deleteEstablishment(id: string) {
        try {
            return db.delete(establishments).where(eq(establishments.id, id)).execute();
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while deleting establishment")
        }
    }
}