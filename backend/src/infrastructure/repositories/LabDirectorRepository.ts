import { db } from "../data";
import { directors, laboratories } from "../data/schema";
import { LabDirector, NewLabDirector, LabDirectorColumns, LabDirectorWithLabInfo } from "../../domain/entities/LabDirector";
import { eq } from "drizzle-orm";

/**
 * Repository class for managing Lab Directors CRUD operations.
 */
export class LabDirectorRepository {

    /**
     * Creates a new Lab Director.
     * @param {NewLabDirector} labDirector - The new lab director details.
     * @returns {Promise<LabDirector | undefined>} - The newly created lab director or undefined if creation failed.
     * @throws {Error} - Throws an error if the creation fails.
     */
    async createLabDirector(labDirector: NewLabDirector) {
        try {
            const result = await db.insert(directors).values(labDirector).returning({ id: directors.id }).execute();
            return result.length > 0 ? result[0] : undefined;;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while creating lab director")
        }
    }

    /**
     * Updates an existing Lab Director's information.
     * @param {LabDirector} labDirector - The lab director's updated information.
     * @returns {Promise<void>} - A promise indicating that the update was successful.
     * @throws {Error} - Throws an error if the update fails.
     */
    updateLabDirector(labDirector: LabDirector) {
        try {
            return db.update(directors).set(labDirector).where(eq(directors.id, labDirector.id)).execute();
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while updating lab director")
        }
    }

    /**
    * Fetches all Lab Directors along with their associated laboratory information.
    * @returns {Promise<LabDirectorWithLabInfo[]>} - A promise containing an array of lab directors with lab info.
    * @throws {Error} - Throws an error if fetching fails.
    */
    async getAllLabDirectors(): Promise<LabDirectorWithLabInfo[]> {
        try {
            const result = await db.select({
                id: directors.id,
                email: directors.email,
                lastname: directors.lastname,
                firstname: directors.firstname,
                phoneNumber: directors.phoneNumber,
                hdr: directors.hdr,
                laboratory: directors.laboratory,
                laboratoryInfo: {
                    name: laboratories.name,
                    city: laboratories.city,
                    country: laboratories.country,
                    address: laboratories.address,
                    means: laboratories.means,
                    expertise: laboratories.expertise
                }
            }).from(directors)
                .leftJoin(laboratories, eq(directors.laboratory, laboratories.id))
                .execute();

            return result
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching lab directors")
        }
    }

    /**
    * Fetches a Lab Director by their ID.
    * @param {string} id - The lab director's ID.
    * @param {LabDirectorColumns} columns - The specific columns to retrieve.
    * @returns {Promise<Partial<LabDirector | undefined>>} - A promise containing the lab director's data or undefined if not found.
    * @throws {Error} - Throws an error if fetching fails.
    */
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

    /**
     * Fetches a Lab Director by their last name.
     * @param {string} lastname - The lab director's last name.
     * @param {LabDirectorColumns} columns - The specific columns to retrieve.
     * @returns {Promise<Partial<LabDirector | undefined>>} - A promise containing the lab director's data or undefined if not found.
     * @throws {Error} - Throws an error if fetching fails.
     */
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

    /**
    * Fetches a Lab Director by the laboratory ID.
    * @param {string} labId - The lab ID.
    * @param {LabDirectorColumns} columns - The specific columns to retrieve.
    * @returns {Promise<Partial<LabDirector | undefined>>} - A promise containing the lab director's data or undefined if not found.
    * @throws {Error} - Throws an error if fetching fails.
    */
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

    /**
     * Fetches a Lab Director by the laboratory ID.
     * @param {string} labId - The lab ID.
     * @param {LabDirectorColumns} columns - The specific columns to retrieve.
     * @returns {Promise<Partial<LabDirector | undefined>>} - A promise containing the lab director's data or undefined if not found.
     * @throws {Error} - Throws an error if fetching fails.
     */
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