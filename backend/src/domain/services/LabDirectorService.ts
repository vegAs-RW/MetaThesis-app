import { NewLabDirector, LabDirector, LabDirectorColumns } from "../entities/LabDirector";
import { LabDirectorRepository } from "../../infrastructure/repositories/LabDirectorRepository";

/**
 * Service class responsible for managing the business logic related to Lab Directors.
 * This class interacts with the LabDirectorRepository and handles the logic and data validation.
 */
export class LabDirectorService {
    private labDirectorRepository: LabDirectorRepository;

    /**
     * Initializes the LabDirectorService and sets up the LabDirectorRepository.
     */
    constructor() {
        this.labDirectorRepository = new LabDirectorRepository();
    }

    /**
    * Creates a new Lab Director.
    * @param {NewLabDirector} labDirector - The Lab Director object to be created.
    * @returns {Promise<LabDirector>} - The newly created Lab Director object.
    */
    async createLabDirector(labDirector: NewLabDirector) {
        const newLabDirector = await this.labDirectorRepository.createLabDirector(labDirector);
        return newLabDirector;
    }

    /**
    * Updates an existing Lab Director's details.
    * @param {LabDirector} labDirector - The Lab Director object with updated details.
    */
    updateLabDirector(labDirector: LabDirector): void {
        this.labDirectorRepository.updateLabDirector(labDirector);
    }

    /**
     * Retrieves all Lab Directors from the repository.
     * @returns {Promise<LabDirector[]>} - A promise that resolves to a list of all Lab Directors.
     */
    getAllLabDirectors() {
        return this.labDirectorRepository.getAllLabDirectors();
    }

    /**
     * Retrieves a Lab Director by their ID.
     * @param {string} id - The unique identifier of the Lab Director.
     * @param {LabDirectorColumns} columns - The columns to select for the Lab Director.
     * @returns {Promise<Partial<LabDirector> | undefined>} - A promise that resolves to the Lab Director or undefined if not found.
     */
    getLabDirectorById(id: string, columns: LabDirectorColumns) {
        return this.labDirectorRepository.getLabDirectorById(id, columns || { id: true, email: true, lastname: true, firstname: true, phoneNumber: true, hdr: true, laboratory: { name: true, city: true, country: true, address: true, means: true, expertise: true } });
    }

    /**
     * Retrieves a Lab Director by their last name.
     * @param {string} lastname - The last name of the Lab Director.
     * @param {LabDirectorColumns} columns - The columns to select for the Lab Director.
     * @returns {Promise<Partial<LabDirector> | undefined>} - A promise that resolves to the Lab Director or undefined if not found.
     */
    getLabDirectorByLastname(lastname: string, columns: LabDirectorColumns) {
        return this.labDirectorRepository.getLabDirectorByLastname(lastname, columns || { id: true, email: true, lastname: true, firstname: true, phoneNumber: true, hdr: true, laboratory: { name: true, city: true, country: true, address: true, means: true, expertise: true } });
    }

    /**
     * Retrieves a Lab Director by their associated laboratory ID.
     * @param {string} labId - The unique identifier of the associated laboratory.
     * @param {LabDirectorColumns} columns - The columns to select for the Lab Director.
     * @returns {Promise<Partial<LabDirector> | undefined>} - A promise that resolves to the Lab Director or undefined if not found.
     */
    getLabDirectorByLabId(labId: string, columns: LabDirectorColumns) {
        return this.labDirectorRepository.getLabDirectorByLabId(labId, columns || { id: true, email: true, lastname: true, firstname: true, phoneNumber: true, hdr: true, laboratory: { name: true, city: true, country: true, address: true, means: true, expertise: true } });
    }

    /**
     * Retrieves a Lab Director by their laboratory.
     * @param {string} labId - The unique identifier of the laboratory.
     * @param {LabDirectorColumns} columns - The columns to select for the Lab Director.
     * @returns {Promise<Partial<LabDirector> | undefined>} - A promise that resolves to the Lab Director or undefined if not found.
     */
    getLabDirectorByLaboratory(labId: string, columns: LabDirectorColumns) {
        return this.labDirectorRepository.getLabDirectorByLaboratory(labId, columns || { id: true, email: true, lastname: true, firstname: true, phoneNumber: true, hdr: true, laboratory: { name: true, city: true, country: true, address: true, means: true, expertise: true } });
    }
}