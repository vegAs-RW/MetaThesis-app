import { Establishment, NewEstablishment, EstablishmentColumns } from "../entities/Establishment";
import { EstablishmentRepository } from "../../infrastructure/repositories/EstablishmentRepository";

/**
 * Service class responsible for managing the business logic related to establishments.
 * This service interacts with the repository layer and handles validation and data manipulation logic.
 */
export class EstablishmentService {
    private establishmentRepository: EstablishmentRepository;

    /**
    * Initializes the EstablishmentService and its repository dependency.
    */
    constructor() {
        this.establishmentRepository = new EstablishmentRepository();
    }

    /**
     * Creates a new establishment.
     * @param {NewEstablishment} establishment - The establishment object to be created.
     * @returns {Promise<Establishment>} - The newly created establishment.
     */
    async createEstablishment(establishment: NewEstablishment) {
        const newEstablishment = await this.establishmentRepository.createEstablishment(establishment);
        return newEstablishment;
    }

    /**
     * Updates an existing establishment's details.
     * @param {Establishment} establishment - The establishment object with updated information.
     */
    updateEstablishment(establishment: Establishment): void {
        this.establishmentRepository.updateEstablishment(establishment);
    }

    /**
     * Retrieves all establishments from the repository.
     * @returns {Promise<Establishment[]>} - A promise that resolves to a list of all establishments.
     */
    getAllEstablishments() {
        return this.establishmentRepository.getAllEstablishments();
    }

    /**
     * Retrieves an establishment by its ID.
     * @param {string} id - The unique identifier of the establishment.
     * @param {EstablishmentColumns} columns - The columns to select for the establishment.
     * @returns {Promise<Partial<Establishment> | undefined>} - A promise that resolves to the establishment or undefined if not found.
     */
    getEstablishmentById(id: string, columns: EstablishmentColumns) {
        return this.establishmentRepository.getEstablishmentById(id, columns || { id: true, name: true, siret: true, address: true, zipcode: true, city: true, telephone: true });
    }

    /**
    * Retrieves an establishment by its name.
    * @param {string} name - The name of the establishment.
    * @param {EstablishmentColumns} columns - The columns to select for the establishment.
    * @returns {Promise<Partial<Establishment> | undefined>} - A promise that resolves to the establishment or undefined if not found.
    */
    getEstablishmentByName(name: string, columns: EstablishmentColumns) {
        return this.establishmentRepository.getEstablishmentByName(name, columns || { id: true, name: true, siret: true, address: true, zipcode: true, city: true, telephone: true });
    }

    /**
     * Deletes an establishment by its ID.
     * @param {string} id - The unique identifier of the establishment to delete.
     * @returns {Promise<void>} - A promise that resolves when the establishment is deleted.
     */
    deleteEstablishment(id: string) {
        return this.establishmentRepository.deleteEstablishment(id);
    }
}