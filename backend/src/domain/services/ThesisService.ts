import { Thesis, NewThesis, ThesisColumns } from "../entities/Thesis";
import { ThesisRepository } from "../../infrastructure/repositories/ThesisRepository";

export class ThesisService {
    private thesisRepository: ThesisRepository;

    constructor() {
        this.thesisRepository = new ThesisRepository();
    }

    async createInitialThesis(thesis: Partial<NewThesis>, advisorId: string) {
        return this.thesisRepository.createInitialThesis(thesis, advisorId);
    }

    async validateThesisTopic(thesisId: string, isValid: boolean, refusedTopic?: string) {
        return this.thesisRepository.validateThesisTopic(thesisId, isValid, refusedTopic);
    }

    async updateJobVacancy(thesisId: string, vacancy: string) {
        return this.thesisRepository.updateJobVacancy(thesisId, vacancy);
    }

    async assignCandidateToThesis(thesisId: string, candidateId: string) {
        return this.thesisRepository.assignCandidateToThesis(thesisId, candidateId);
    }

    async addAnrtNumberToThesis(thesisId: string, anrtNumber: string) {
        return this.thesisRepository.addAnrtNumberToThesis(thesisId, anrtNumber);
    }

    async getAllTheses(columns: ThesisColumns, filters: { year?: number, domain?: string, keyword?: string, topicValidation?: boolean }) {
        return this.thesisRepository.getAllTheses(columns || { id: true, topic: true, year: true, domain: true, scientistInterest: true, keyword: true, vacancy: true, topicValidation: true, anrtNumber: true, refusedTopic: true, advisor: true, candidate: true }, filters);
    }

    async getThesisById(id: string, columns: ThesisColumns) {
        return this.thesisRepository.getThesisById(id, columns || { id: true, topic: true, year: true, domain: true, scientistInterest: true, keyword: true, vacancy: true, topicValidation: true, anrtNumber: true, refusedTopic: true, advisor: true, candidate: true });
    }
}