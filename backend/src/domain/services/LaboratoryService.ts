import { Laboratory, NewLaboratory, LaboratoryColumns } from "../entities/Laboratory";
import { LaboratoryRepository } from "../../infrastructure/repositories/LaboratoryRepository";
import { LabDirectorRepository } from "../../infrastructure/repositories/LabDirectorRepository";
import { NewLabDirector } from "../entities/LabDirector";

/**
 * Service class responsible for managing laboratories and their associated lab directors.
 * This class encapsulates the business logic and interacts with the respective repositories.
 */
export class LaboratoryService {
    private laboratoryRepository: LaboratoryRepository;
    private directorRepository: LabDirectorRepository;

    /**
     * Initializes the LaboratoryService and sets up the LaboratoryRepository and LabDirectorRepository.
     */
    constructor() {
        this.laboratoryRepository = new LaboratoryRepository();
        this.directorRepository = new LabDirectorRepository();
    }

    /**
     * Creates a new laboratory and an associated lab director.
     * @param {NewLaboratory} laboratory - The laboratory object to be created.
     * @param {NewLabDirector} director - The lab director object to be associated with the new laboratory.
     * @returns {Promise<Laboratory>} - A promise that resolves to the newly created laboratory object.
     * @throws {Error} - Throws an error if the laboratory creation fails.
     */
    async createLaboratory(laboratory: NewLaboratory, director: NewLabDirector) {
        const newLaboratory = await this.laboratoryRepository.createLaboratory(laboratory);

        if (!newLaboratory) throw new Error("An error occurred while creating laboratory");

        director.laboratory = newLaboratory.id;
        await this.directorRepository.createLabDirector(director);

        return newLaboratory;
    }

    /**
     * Updates an existing laboratory's details.
     * @param {Laboratory} laboratory - The laboratory object with updated details.
     */
    updateLaboratory(laboratory: Laboratory): void {
        this.laboratoryRepository.updateLaboratory(laboratory);
    }

    /**
     * Retrieves all laboratories from the repository.
     * @returns {Promise<Laboratory[]>} - A promise that resolves to a list of all laboratories.
     */
    getAllLaboratories() {
        return this.laboratoryRepository.getAllLaboratories();
    }

    /**
    * Retrieves a laboratory by its ID.
    * @param {string} id - The unique identifier of the laboratory.
    * @param {LaboratoryColumns} columns - The columns to select for the laboratory.
    * @returns {Promise<Partial<Laboratory> | undefined>} - A promise that resolves to the laboratory or undefined if not found.
    */
    getLaboratoryById(id: string, columns: LaboratoryColumns) {
        return this.laboratoryRepository.getLaboratoryById(id, columns || { id: true, name: true, address: true, city: true, country: true, means: true, expertise: true });
    }

    /**
     * Retrieves a laboratory by its name.
     * @param {string} name - The name of the laboratory.
     * @param {LaboratoryColumns} columns - The columns to select for the laboratory.
     * @returns {Promise<Partial<Laboratory> | undefined>} - A promise that resolves to the laboratory or undefined if not found.
     */
    getLaboratoryByName(name: string, columns: LaboratoryColumns) {
        return this.laboratoryRepository.getLaboratoryByName(name, columns || { id: true, name: true, address: true, city: true, country: true, means: true, expertise: true });
    }

    /**
     * Retrieves a laboratory by its city.
     * @param {string} city - The city where the laboratory is located.
     * @param {LaboratoryColumns} columns - The columns to select for the laboratory.
     * @returns {Promise<Partial<Laboratory> | undefined>} - A promise that resolves to the laboratory or undefined if not found.
     */
    getLaboratoryByCity(city: string, columns: LaboratoryColumns) {
        return this.laboratoryRepository.getLaboratoryByCity(city, columns || { id: true, name: true, address: true, city: true, country: true, means: true, expertise: true });
    }

    /**
     * Retrieves a laboratory by its country.
     * @param {string} country - The country where the laboratory is located.
     * @param {LaboratoryColumns} columns - The columns to select for the laboratory.
     * @returns {Promise<Partial<Laboratory> | undefined>} - A promise that resolves to the laboratory or undefined if not found.
     */
    getLaboratoryByCountry(country: string, columns: LaboratoryColumns) {
        return this.laboratoryRepository.getLaboratoryByCountry(country, columns || { id: true, name: true, address: true, city: true, country: true, means: true, expertise: true });
    }

    /**
     * Deletes a laboratory by its ID.
     * @param {string} id - The unique identifier of the laboratory to delete.
     * @returns {Promise<void>} - A promise that resolves when the laboratory is deleted.
     */
    deleteLaboratory(id: string) {
        return this.laboratoryRepository.deleteLaboratory(id);
    }
}