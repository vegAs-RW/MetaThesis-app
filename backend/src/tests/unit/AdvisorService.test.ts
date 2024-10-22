import { beforeAll, describe, expect, it, jest } from '@jest/globals';
import { AdvisorService } from '../../domain/services/AdvisorService';
import { AdvisorRepository } from '../../infrastructure/repositories/AdvisorRepository';
import { NewAdvisor, Advisor } from '../../domain/entities/Advisor';


jest.mock("../../infrastructure/repositories/AdvisorRepository");

describe('AdvisorService', () => {
    let advisorService: AdvisorService;
    let mockAdvisorRepository: jest.Mocked<AdvisorRepository>;

    const newAdvisor: NewAdvisor = {
        id: '1',
        department: 'Finance',
        research_area: 'Economics',
        ifrs: "1456324",
        costCenter: 'CC-123',
        establishment: "1",
        email: "jane.doe@exemple.com",
        firstname: "Jane",
        lastname: "Doe", 
        role: "advisor",
        password: "password"
        
    };

    const createdAdvisor: Advisor = {
        ...newAdvisor,
    };

    beforeAll(() => {
        mockAdvisorRepository = new AdvisorRepository() as jest.Mocked<AdvisorRepository>;
        advisorService = new AdvisorService();
        (advisorService as any).advisorRepository = mockAdvisorRepository;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create a new advisor", async () => {
        mockAdvisorRepository.createAdvisor.mockResolvedValue(createdAdvisor.id);

        const result = await advisorService.createAdvisor(newAdvisor);

        expect(result).toEqual(createdAdvisor.id);
        expect(mockAdvisorRepository.createAdvisor).toHaveBeenCalledWith(newAdvisor);
    });


    it("should update an advisor", async () => {
        const updatedAdvisor: Advisor = { ...newAdvisor, department: "Marketing" };
        mockAdvisorRepository.updateAdvisor.mockResolvedValue(undefined);

        await advisorService.updateAdvisor(updatedAdvisor);

        expect(mockAdvisorRepository.updateAdvisor).toHaveBeenCalledWith(updatedAdvisor);
    });
    
    it("should get all advisors", async () => {
        const advisorsList: Advisor[] = [createdAdvisor];
        mockAdvisorRepository.getAllAdvisors.mockResolvedValue(advisorsList);

        const result = await advisorService.getAllAdvisors();

        expect(result).toEqual(advisorsList);
        expect(mockAdvisorRepository.getAllAdvisors).toHaveBeenCalled();
    });


    it("should get advisor by ID", async () => {
        const advisorId = "1";
        const columns = { id: true, department: true, research_area: true, ifrs: true, costCenter: true };
        mockAdvisorRepository.getAdvisorById.mockResolvedValue(createdAdvisor);

        const result = await advisorService.getAdvisorById(advisorId, columns);

        expect(result).toEqual(createdAdvisor);
        expect(mockAdvisorRepository.getAdvisorById).toHaveBeenCalledWith(advisorId, columns);
    });

    it("should get advisor by email", async () => {
        const email = "jane.doe@example.com";
        const columns = { id: true, department: true, research_area: true, ifrs: true, costCenter: true };
        mockAdvisorRepository.getAdvisorByEmail.mockResolvedValue(createdAdvisor);

        const result = await advisorService.getAdvisorByEmail(email, columns);

        expect(result).toEqual(createdAdvisor);
        expect(mockAdvisorRepository.getAdvisorByEmail).toHaveBeenCalledWith(email, columns);
    });

    it("should delete an advisor", async () => {
        const advisorId = "1";
        mockAdvisorRepository.deleteAdvisor.mockResolvedValue(undefined);

        await advisorService.deleteAdvisor(advisorId);

        expect(mockAdvisorRepository.deleteAdvisor).toHaveBeenCalledWith(advisorId);
    });
});
