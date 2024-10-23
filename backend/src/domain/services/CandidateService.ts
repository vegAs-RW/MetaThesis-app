import { Candidate, NewCandidate } from "../entities/Candidate";
import { CandidateRepository } from "../../infrastructure/repositories/CandidateRepository";

/**
 * Service class responsible for managing candidate-related business logic.
 * Acts as an intermediary between the repository (data layer) and other parts of the application.
 */
export class CandidateService {
    private candidateRepository: CandidateRepository;

    /**
     * Initializes the CandidateService and its repository dependency.
     */
    constructor() {
        this.candidateRepository = new CandidateRepository();
    }

    /**
    * Creates a new candidate.
    * @param {NewCandidate} candidate - The candidate object to be created.
    * @returns {Promise<string | undefined>} - The ID of the newly created candidate or undefined if the input is invalid.
    */
    async createCandidate(candidate: NewCandidate) {
        if (candidate?.firstname.trim().length < 1 || candidate?.lastname.trim().length < 1) return;
        const newCandidate = await this.candidateRepository.createCandidate(candidate);
        return newCandidate[0].id;
    }

    /**
    * Updates an existing candidate's details.
    * @param {Candidate} candidate - The candidate object with updated information.
    */
    updateCandidate(candidate: Candidate): void {
        this.candidateRepository.updateCandidate(candidate);
    }

    /**
     * Retrieves all candidates from the repository.
     * @returns {Promise<Candidate[]>} - A promise that resolves to a list of all candidates.
     */
    getAllCandidates() {
        return this.candidateRepository.getAllCandidates();
    }

    /**
     * Retrieves a candidate by their ID.
     * @param {string} id - The unique identifier of the candidate.
     * @returns {Promise<Candidate | undefined>} - A promise containing the candidate, or undefined if the ID is invalid.
     */
    getCandidateById(id: string) {
        if (!id || id.trim().length < 1) return;
        return this.candidateRepository.getCandidateById(id);
    }

    /**
    * Retrieves candidates by their assigned advisor.
    * @param {string} advisor - The advisor's identifier.
    * @returns {Promise<Candidate[]> | undefined} - A promise resolving to a list of candidates, or undefined if the advisor's ID is invalid.
    */
    getCandidatesByAdvisor(advisor: string) {
        if (!advisor || advisor.trim().length < 1) return;
        return this.candidateRepository.getCandidatesByAdvisor(advisor);
    }

    /**
     * Deletes a candidate by their ID.
     * @param {string} id - The unique identifier of the candidate to be deleted.
     */
    deleteCandidate(id: string): void {
        if (!id || id.trim().length < 1) return;
        this.candidateRepository.deleteCandidate(id);
    }
}