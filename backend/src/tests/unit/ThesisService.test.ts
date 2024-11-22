/*import { beforeAll, describe, expect, it, jest } from '@jest/globals';
import { ThesisService } from '../../domain/services/ThesisService';
import { ThesisRepository } from '../../infrastructure/repositories/ThesisRepository';
import { NewThesis, Thesis } from '../../domain/entities/Thesis';
import { QueryResult } from 'pg';


jest.mock("../../infrastructure/repositories/ThesisRepository");

describe('ThesisService', () => {
    let thesisService: ThesisService;
    let mockThesisRepository: jest.Mocked<ThesisRepository>;

    const newThesis: Partial<NewThesis> = {
        topic: 'Recherche sur l\'IA',
        year: 2024,
        domain: 'Informatique',
        scientistInterest: 'Apprentissage Automatique',
        keyword: 'IA, Apprentissage Automatique',
        advisorId: 'advisor-id',
        candidateId: null,
        vacancy: 'Ouvert',
        topicValidation: false,
        anrtNumber: null
    };

    const expectedResponse: QueryResult<never> = {
        rows: [],
        command: 'UPDATE',
        rowCount: 1,
        oid: 0,
        fields: []
    };

    beforeAll(() => {
        mockThesisRepository = new ThesisRepository() as jest.Mocked<ThesisRepository>;
        thesisService = new ThesisService();
        (thesisService as any).thesisRepository = mockThesisRepository;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a thesis', async () => {
        mockThesisRepository.createInitialThesis.mockResolvedValue({ id: '1', ...newThesis });

        const result = await thesisService.createInitialThesis(newThesis, 'advisor-id');

        expect(result).toEqual({ id: '1', ...newThesis });
        expect(mockThesisRepository.createInitialThesis).toHaveBeenCalledWith(newThesis, 'advisor-id');
    });

    it('should validate a thesis topic', async () => {
        const thesisId = '1';
        const isValid = true;
        const refusedTopic = 'Sujet refusé';


        mockThesisRepository.validateThesisTopic.mockResolvedValue(expectedResponse);

        await thesisService.validateThesisTopic(thesisId, isValid, refusedTopic);

        expect(mockThesisRepository.validateThesisTopic).toHaveBeenCalledWith(thesisId, isValid, refusedTopic);
    });

    it('should update job vacancy', async () => {
        const thesisId = '1';
        const vacancy = '1255-5222';

        mockThesisRepository.updateJobVacancy.mockResolvedValue(expectedResponse);

        await thesisService.updateJobVacancy(thesisId, vacancy);

        expect(mockThesisRepository.updateJobVacancy).toHaveBeenCalledWith(thesisId, vacancy);
    });

    it('should assign a candidate to a thesis', async () => {
        const thesisId = '1';
        const candidateId = 'candidate-id';

        mockThesisRepository.assignCandidateToThesis.mockResolvedValue(expectedResponse);

        await thesisService.assignCandidateToThesis(thesisId, candidateId);

        expect(mockThesisRepository.assignCandidateToThesis).toHaveBeenCalledWith(thesisId, candidateId);
    });

    it('should add an ANRT number to a thesis', async () => {
        const thesisId = '1';
        const anrtNumber = 'ANRT-2024-1';

        mockThesisRepository.addAnrtNumberToThesis.mockResolvedValue(expectedResponse);

        await thesisService.addAnrtNumberToThesis(thesisId, anrtNumber);

        expect(mockThesisRepository.addAnrtNumberToThesis).toHaveBeenCalledWith(thesisId, anrtNumber);
    });

    it('should get all theses', async () => {
        const columns = { id: true, topic: true, year: true, domain: true, scientistInterest: true, keyword: true, vacancy: true, topicValidation: true, anrtNumber: true, refusedTopic: true, advisor: true, candidate: true };
        const filters = { year: 2024, domain: 'Informatique', keyword: 'IA' };

        const mockTheses = [
            {
                id: '1',
                topic: 'Thèse 1',
                year: 2024,
                domain: 'Informatique',
                scientistInterest: 'Intelligence Artificielle',
                keyword: 'IA',
                vacancy: null,
                topicValidation: true,
                anrtNumber: null,
                refusedTopic: null,
                advisor: {
                    id: 'a1',
                    department: 'Informatique',
                    research_area: 'IA',
                    ifrs: 'IFRS1',
                    costCenter: 'CC1',
                },
                candidate: {
                    id: 'c1',
                    firstname: 'Jean',
                    lastname: 'Dupont'
                }
            },
            {
                id: '2',
                topic: 'Thèse 2',
                year: 2024,
                domain: 'Mathématiques',
                scientistInterest: 'Statistiques',
                keyword: 'Statistiques',
                vacancy: null,
                topicValidation: false,
                anrtNumber: null,
                refusedTopic: 'Thème refusé',
                advisor: {
                    id: 'a2',
                    department: 'Mathématiques',
                    research_area: 'Statistiques',
                    ifrs: 'IFRS2',
                    costCenter: 'CC2',
                },
                candidate: {
                    id: 'c2',
                    firstname: 'Marie',
                    lastname: 'Curie'
                }
            }
        ];
        mockThesisRepository.getAllTheses.mockResolvedValue(mockTheses);

        const result = await thesisService.getAllTheses(columns, filters);

        expect(result).toEqual(mockTheses);
        expect(mockThesisRepository.getAllTheses).toHaveBeenCalledWith(columns, filters);
    });

    it('should get a thesis by ID', async () => {
        const thesisId = '1';
        const columns = { id: true, topic: true, year: true, domain: true, scientistInterest: true, keyword: true, vacancy: true, topicValidation: true, anrtNumber: true, refusedTopic: true, advisor: true, candidate: true };

        mockThesisRepository.getThesisById.mockResolvedValue({ id: thesisId, ...newThesis });

        const result = await thesisService.getThesisById(thesisId, columns);

        expect(result).toEqual({ id: '1', ...newThesis });
        expect(mockThesisRepository.getThesisById).toHaveBeenCalledWith(thesisId, columns);
    });
});
*/