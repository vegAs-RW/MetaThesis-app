import { NewAdvisor, Advisor, AdvisorColumns } from "../entities/Advisor";
import { AdvisorRepository } from "../../infrastructure/repositories/AdvisorRepository";

/**
 * Service class that handles business logic for managing advisors.
 * This layer sits between the API/controller and the repository to ensure that
 * business rules are followed before interacting with the database.
 */
export class AdvisorService {
    private advisorRepository: AdvisorRepository;

    /**
     * Initializes a new instance of the AdvisorService class
     * and creates a repository instance to manage advisor data.
     */
    constructor() {
        this.advisorRepository = new AdvisorRepository();
    }

    /**
     * Creates a new advisor and saves it in the database.
     * @param {NewAdvisor} advisor - The advisor object to be created.
     * @returns {Promise<Advisor>} - The newly created advisor.
     */
    async createAdvisor(advisor: NewAdvisor) {
        const newAdvisor = await this.advisorRepository.createAdvisor(advisor);
        return newAdvisor;
    }

    /**
     * Updates an existing advisor in the database.
     * @param {Advisor} advisor - The advisor object containing updated information.
     * @returns {Promise<void>} - A promise indicating that the update operation is complete.
     */
    async updateAdvisor(advisor: Advisor): Promise<void> {
        await this.advisorRepository.updateAdvisor(advisor);
    }

    /**
     * Retrieves all advisors from the database.
     * @returns {Promise<Advisor[]>} - A promise containing an array of all advisors.
     */
    async getAllAdvisors() {
        return await this.advisorRepository.getAllAdvisors();
    }

    /**
     * Retrieves an advisor by their ID.
     * @param {string} id - The ID of the advisor to retrieve.
     * @param {AdvisorColumns} columns - The specific columns to retrieve for the advisor.
     * If not provided, defaults to essential columns.
     * @returns {Promise<Partial<Advisor | undefined>>} - A promise containing the advisor data or undefined if not found.
     */
    async getAdvisorById(id: string, columns: AdvisorColumns) {
        return await this.advisorRepository.getAdvisorById(id, columns || { id: true, department: true, research_area: true, ifrs: true, costCenter: true, establishment: { id: true, name: true }, users: { email: true, firstname: true, lastname: true } });
    }

    /**
     * Retrieves an advisor by their email address.
     * @param {string} email - The email of the advisor to retrieve.
     * @param {AdvisorColumns} columns - The specific columns to retrieve for the advisor.
     * If not provided, defaults to essential columns.
     * @returns {Promise<Partial<Advisor | undefined>>} - A promise containing the advisor data or undefined if not found.
     */
    async getAdvisorByEmail(email: string, columns: AdvisorColumns) {
        return await this.advisorRepository.getAdvisorByEmail(email, columns || { id: true, department: true, research_area: true, ifrs: true, costCenter: true, establishment: { id: true, name: true }, users: { email: true, firstname: true, lastname: true } });
    }

    /**
     * Deletes an advisor from the database by their ID.
     * @param {string} id - The ID of the advisor to delete.
     * @returns {Promise<void>} - A promise indicating that the delete operation is complete.
     */
    async deleteAdvisor(id: string): Promise<void> {
        await this.advisorRepository.deleteAdvisor(id);
    }
}