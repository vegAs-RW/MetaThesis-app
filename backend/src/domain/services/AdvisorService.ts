import { NewAdvisor, Advisor, AdvisorColumns } from "../entities/Advisor";
import { AdvisorRepository } from "../../infrastructure/repositories/AdvisorRepository";

export class AdvisorService {
    private advisorRepository: AdvisorRepository;

    constructor() {
        this.advisorRepository = new AdvisorRepository();
    }

    async createAdvisor(advisor: NewAdvisor) {
        const newAdvisor = await this.advisorRepository.createAdvisor(advisor);
        return newAdvisor;
    }

    async updateAdvisor(advisor: Advisor): Promise<void> {
        await this.advisorRepository.updateAdvisor(advisor);
    }

    async getAllAdvisors() {
        return await this.advisorRepository.getAllAdvisors();
    }

    async getAdvisorById(id: string, columns: AdvisorColumns) {
        return await this.advisorRepository.getAdvisorById(id, columns || { id: true, department: true, research_area: true, ifrs: true, costCenter: true, establishment: { id: true, name: true }, users: { email: true, firstname: true, lastname: true } });
    }

    async getAdvisorByEmail(email: string, columns: AdvisorColumns) {
        return await this.advisorRepository.getAdvisorByEmail(email, columns || { id: true, department: true, research_area: true, ifrs: true, costCenter: true, establishment: { id: true, name: true }, users: { email: true, firstname: true, lastname: true } });
    }

    async deleteAdvisor(id: string): Promise<void> {
        await this.advisorRepository.deleteAdvisor(id);
    }
}