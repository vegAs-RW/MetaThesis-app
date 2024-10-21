import { Candidate, NewCandidate, CandidateColumns } from "../entities/Candidate";
import { CandidateRepository } from "../../infrastructure/repositories/CandidateRepository";

export class CandidateService {
    private candidateRepository: CandidateRepository;

    constructor() {
        this.candidateRepository = new CandidateRepository();
    }

    async createCandidate(candidate: NewCandidate){
        const newCandidate = await this.candidateRepository.createCandidate(candidate);
        return newCandidate;
    }

    updateCandidate(candidate: Candidate): void {
        this.candidateRepository.updateCandidate(candidate);
    }

    getAllCandidates() {
        return this.candidateRepository.getAllCandidates();
    }

    getCandidateById(id: string, columns: CandidateColumns) {
        return this.candidateRepository.getCandidateById(id, columns || {id: true, firstname: true, lastname: true, birthdate: true, lastDegree: true, dateLastDegree: true, doctoralSchool: true, residentPermit: true, committeeValidation: true, hrValidation: true, zrrValidation: true, advisor: {id: true, department: true, research_area: true, ifrs: true, costCenter: true}});
    }

    getCandidateByAdvisor(advisor: string, columns: CandidateColumns) {
        return this.candidateRepository.getCandidateByAdvisor(advisor, columns || {id: true, firstname: true, lastname: true, birthdate: true, lastDegree: true, dateLastDegree: true, doctoralSchool: true, residentPermit: true, committeeValidation: true, hrValidation: true, zrrValidation: true, advisor: {id: true, department: true, research_area: true, ifrs: true, costCenter: true}});
    }

    deleteCandidate(id: string): void {
        this.candidateRepository.deleteCandidate(id);
    }
}