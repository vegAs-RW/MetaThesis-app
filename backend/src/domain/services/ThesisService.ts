import { Thesis, NewThesis, ThesisColumns } from "../entities/Thesis";
import { ThesisRepository } from "../../infrastructure/repositories/ThesisRepository";

/**
 * Service class responsible for managing theses and their related operations.
 * This class encapsulates the business logic and interacts with the Thesis repository.
 */
export class ThesisService {
    private thesisRepository: ThesisRepository;

    /**
    * Initializes the ThesisService and sets up the ThesisRepository.
    */
    constructor() {
        this.thesisRepository = new ThesisRepository();
    }

    /**
    * Creates an initial thesis with a given advisor ID.
    * @param {Partial<NewThesis>} thesis - The thesis object containing initial details.
    * @param {string} advisorId - The ID of the advisor associated with the thesis.
    * @returns {Promise<Thesis>} - A promise that resolves to the newly created thesis object.
    */
    async createInitialThesis(thesis: Partial<NewThesis>) {
        return this.thesisRepository.createInitialThesis(thesis);
    }

    /**
     * Validates the topic of a thesis.
     * @param {string} thesisId - The ID of the thesis to validate.
     * @param {boolean} isValid - Indicates if the thesis topic is valid or not.
     * @param {string} [refusedTopic] - Optional parameter to specify a refused topic.
     * @returns {Promise<void>} - A promise that resolves once the validation is complete.
     */
    async validateThesisTopic(thesisId: string, isValid: boolean, refusedTopic?: string) {
        return this.thesisRepository.validateThesisTopic(thesisId, isValid, refusedTopic);
    }

    /**
     * Updates the job vacancy associated with a thesis.
     * @param {string} thesisId - The ID of the thesis to update.
     * @param {string} vacancy - The new job vacancy information.
     * @returns {Promise<void>} - A promise that resolves once the update is complete.
     */
    async updateJobVacancy(thesisId: string, vacancy: string) {
        return this.thesisRepository.updateJobVacancy(thesisId, vacancy);
    }

    /**
     * Assigns a candidate to a thesis.
     * @param {string} thesisId - The ID of the thesis to which the candidate will be assigned.
     * @param {string} candidateId - The ID of the candidate to assign.
     * @returns {Promise<void>} - A promise that resolves once the candidate has been assigned.
     */
    async assignCandidateToThesis(thesisId: string, candidateId: string) {
        return this.thesisRepository.assignCandidateToThesis(thesisId, candidateId);
    }

    /**
     * Adds an ANRT number to a thesis.
     * @param {string} thesisId - The ID of the thesis to update.
     * @param {string} anrtNumber - The ANRT number to associate with the thesis.
     * @returns {Promise<void>} - A promise that resolves once the number has been added.
     */
    async addAnrtNumberToThesis(thesisId: string, anrtNumber: string) {
        return this.thesisRepository.addAnrtNumberToThesis(thesisId, anrtNumber);
    }

    /**
     * Retrieves all theses with optional filters and selected columns.
     * @param {ThesisColumns} columns - The columns to select for the theses.
     * @param {Object} filters - Optional filters for retrieving theses.
     * @param {number} [filters.year] - The year of the theses.
     * @param {string} [filters.domain] - The domain of the theses.
     * @param {string} [filters.keyword] - Keywords related to the theses.
     * @param {boolean} [filters.topicValidation] - Filter based on the topic validation status.
     * @returns {Promise<Thesis[]>} - A promise that resolves to a list of theses.
     */
    async getAllTheses(columns: ThesisColumns, filters: { year?: number, domain?: string, keyword?: string, advisorName?: string }) {
        return this.thesisRepository.getAllTheses(columns || { id: true, topic: true, year: true, domain: true, scientistInterest: true, keyword: true, vacancy: true, topicValidation: true, anrtNumber: true, refusedTopic: true, advisor: true, candidate: true }, filters);
    }

    /**
     * Retrieves a thesis by its ID with specified columns.
     * @param {string} id - The unique identifier of the thesis.
     * @param {ThesisColumns} columns - The columns to select for the thesis.
     * @returns {Promise<Partial<Thesis> | undefined>} - A promise that resolves to the thesis or undefined if not found.
     */
    async getThesisById(id: string, columns: ThesisColumns) {
        return this.thesisRepository.getThesisById(id, columns || { id: true, topic: true, year: true, domain: true, scientistInterest: true, keyword: true, vacancy: true, topicValidation: true, anrtNumber: true, refusedTopic: true, advisor: true, candidate: true });
    }

    /**
     * Retrieves all theses associated with a specific advisor ID.
     * @param {string} advisorId - The ID of the advisor for which to retrieve theses.
     * @returns {Promise<Thesis[]>} - A promise that resolves to a list of theses associated with the advisor.
     */
    async getThesesByAdvisorId(advisorId: string): Promise<Thesis[]> {
        return this.thesisRepository.getThesesByAdvisorId(advisorId);
    }
}