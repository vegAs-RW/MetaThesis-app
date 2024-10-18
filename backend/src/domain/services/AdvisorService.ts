import { NewAdvisor, Advisor, AdvisorColumns } from "../entities/Advisor";
import { AdvisorRepository } from "../../infrastructure/repositories/AdvisorRepository";

export class AdvisorService {
    private advisorRepository: AdvisorRepository;

    constructor() {
        this.advisorRepository = new AdvisorRepository();
    }

    async createAdvisor(advisor: NewAdvisor){
       const newAdvisor = await this.advisorRepository.createAdvisor(advisor);
       return newAdvisor;
    }

    updateAdvisor(advisor: Advisor): void {
        this.advisorRepository.updateAdvisor(advisor);
    }

    getAllAdvisors() {
        return this.advisorRepository.getAllAdvisors();
    }

    getAdvisorById(id: string, columns: AdvisorColumns) {
        return this.advisorRepository.getAdvisorById(id, columns || {id: true, department: true, research_area: true, ifrs: true, costCenter: true, establishment: {id: true, name: true}, users: {email: true, firstname: true, lastname: true}});
    }

    getAdvisorByEmail(email: string, columns: AdvisorColumns) {
        return this.advisorRepository.getAdvisorByEmail(email, columns || {id: true, department: true, research_area: true, ifrs: true, costCenter: true, establishment: {id: true, name: true}, users: {email: true, firstname: true, lastname: true}});
    }

    deleteAdvisor(id: string): void {
        this.advisorRepository.deleteAdvisor(id);
    }
}