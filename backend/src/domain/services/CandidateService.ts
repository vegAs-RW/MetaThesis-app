import { Candidate, NewCandidate, CandidateColumns } from "../entities/Candidate";
import { CandidateRepository } from "../../infrastructure/repositories/CandidateRepository";

export class CandidateService {
    private candidateRepository: CandidateRepository;

    constructor() {
        this.candidateRepository = new CandidateRepository();
    }

    async createCandidate(candidate: NewCandidate){
        if (candidate?.firstname.trim().length < 1 || candidate?.lastname.trim().length < 1) return;
        const newCandidate = await this.candidateRepository.createCandidate(candidate);
        return newCandidate[0].id;
    }

    updateCandidate(candidate: Candidate): void {
        this.candidateRepository.updateCandidate(candidate);
    }

    getAllCandidates() {
        return this.candidateRepository.getAllCandidates();
    }

    getCandidateById(id: string) {
        if (!id || id.trim().length < 1) return;
        return this.candidateRepository.getCandidateById(id);
    }

    getCandidatesByAdvisor(advisor: string) {
        if (!advisor || advisor.trim().length < 1) return;
        return this.candidateRepository.getCandidatesByAdvisor(advisor);
    }

    deleteCandidate(id: string): void {
        if (!id || id.trim().length < 1) return;
        this.candidateRepository.deleteCandidate(id);
    }
}