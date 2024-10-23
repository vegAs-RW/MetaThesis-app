import { beforeAll, describe, expect, it, jest } from '@jest/globals';
import { CandidateService } from '../../domain/services/CandidateService';
import { CandidateRepository } from '../../infrastructure/repositories/CandidateRepository';
import { NewCandidate, Candidate } from '../../domain/entities/Candidate';

jest.mock('../../infrastructure/repositories/CandidateRepository');

describe('CandidateService', () => {
    let candidateService: CandidateService;
    let mockCandidateRepository: jest.Mocked<CandidateRepository>;

    const newCandidate: NewCandidate = {
        firstname: 'John',
        lastname: 'Doe',
        birthdate: '1990-01-01',
        lastDegree: 'Master',
        dateLastDegree: "2015-06-15",
        doctoralSchool: 'Some School',
        residentPermit: "true",
        committeeValidation: true,
        hrValidation: false,
        zrrValidation: false,
        advisor: 'advisor-id' 
    }

    const createdCandidate: Candidate = {
        id: '1',
        ...newCandidate
    }

    const candidateWithAdvisor = {
        ...createdCandidate,
        advisorInfo: {
            department: 'Department A',
            research_area: 'Research Area A',
            ifrs: 'IFRS A',
            costCenter: 'Cost Center A'
        }
    };

    beforeAll(() => {
        mockCandidateRepository = new CandidateRepository() as jest.Mocked<CandidateRepository>;
        candidateService = new CandidateService();
        (candidateService as any).candidateRepository = mockCandidateRepository;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new candidate', async () => {
        mockCandidateRepository.createCandidate.mockResolvedValue([createdCandidate]);

        const result = await candidateService.createCandidate(newCandidate);

        expect(result).toEqual(createdCandidate.id);
        expect(mockCandidateRepository.createCandidate).toHaveBeenCalledWith(newCandidate);
    });

    it('should return undefined if firstname or lastname is empty', async () => {
        const invalidCandidate: NewCandidate = { ...newCandidate, firstname: '', lastname: '' };
        const result = await candidateService.createCandidate(invalidCandidate);

        expect(result).toBeUndefined(); 
    });

    it('should update an existing candidate', () => {
        // Mocking the repository method
        (mockCandidateRepository.updateCandidate as jest.Mock).mockImplementation(() => {});

        candidateService.updateCandidate(createdCandidate);

        expect(mockCandidateRepository.updateCandidate).toHaveBeenCalledWith(createdCandidate);
    });

    it('should get all candidates', async () => {
        mockCandidateRepository.getAllCandidates.mockResolvedValue([candidateWithAdvisor]);

        const result = await candidateService.getAllCandidates();

        expect(result).toEqual([candidateWithAdvisor]);
        expect(mockCandidateRepository.getAllCandidates).toHaveBeenCalledTimes(1);
    });

    it('should get a candidate by id', async () => {
        mockCandidateRepository.getCandidateById.mockResolvedValue(createdCandidate);

        const result = await candidateService.getCandidateById('1');

        expect(result).toEqual(createdCandidate);
        expect(mockCandidateRepository.getCandidateById).toHaveBeenCalledWith('1');
    });

    it('should get a candidate by advisor id', async () => {
        mockCandidateRepository.getCandidatesByAdvisor.mockResolvedValue([candidateWithAdvisor]);

        const result = await candidateService.getCandidatesByAdvisor('advisor-id');

        expect(result).toEqual([candidateWithAdvisor]);
        expect(mockCandidateRepository.getCandidatesByAdvisor).toHaveBeenCalledWith('advisor-id');
    });

    it('should delete a candidate by id', () => {
        // Mocking the repository method
        (mockCandidateRepository.deleteCandidate as jest.Mock).mockImplementation(() => {});

        candidateService.deleteCandidate('1');

        expect(mockCandidateRepository.deleteCandidate).toHaveBeenCalledWith('1');
    });
})
