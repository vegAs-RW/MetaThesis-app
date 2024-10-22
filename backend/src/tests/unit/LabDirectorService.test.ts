import { beforeAll, describe, expect, it, jest } from '@jest/globals';
import { LabDirectorService } from '../../domain/services/LabDirectorService';
import { LabDirectorRepository } from '../../infrastructure/repositories/LabDirectorRepository';
import { NewLabDirector, LabDirector, LabDirectorWithLabInfo } from '../../domain/entities/LabDirector';

// Moquer le LabDirectorRepository
jest.mock('../../infrastructure/repositories/LabDirectorRepository');

describe('LabDirectorService', () => {
    let labDirectorService: LabDirectorService;
    let mockLabDirectorRepository: jest.Mocked<LabDirectorRepository>;

    const newLabDirector: NewLabDirector = {
        email: 'director@example.com',
        lastname: 'Doe',
        firstname: 'John',
        phoneNumber: '123-456-7890',
        hdr: true,
        laboratory: '1',  // Assurez-vous que ce champ corresponde à votre définition
    };

    const createdLabDirector: LabDirector = {
        id: '1',
        ...newLabDirector,
    };

    beforeAll(() => {
        mockLabDirectorRepository = new LabDirectorRepository() as jest.Mocked<LabDirectorRepository>;
        labDirectorService = new LabDirectorService();
        // Injecter le mock dans le service
        (labDirectorService as any).labDirectorRepository = mockLabDirectorRepository;
    });

    it('should create a new lab director', async () => {
        mockLabDirectorRepository.createLabDirector.mockResolvedValue(createdLabDirector);

        const result = await labDirectorService.createLabDirector(newLabDirector);

        expect(result).toEqual(createdLabDirector);
        expect(mockLabDirectorRepository.createLabDirector).toHaveBeenCalledWith(newLabDirector);
    });

    it('should update an existing lab director', async () => {
        const labDirectorToUpdate: LabDirector = {
            id: '1',
            ...newLabDirector,
        };

        // Mocking the repository method
        (mockLabDirectorRepository.updateLabDirector as jest.Mock).mockImplementation(() => {});

        labDirectorService.updateLabDirector(labDirectorToUpdate);

        expect(mockLabDirectorRepository.updateLabDirector).toHaveBeenCalledWith(labDirectorToUpdate);
    });

    it('should get all lab directors', async () => {
        const labDirectors: LabDirectorWithLabInfo [] = [{
            id: '1',
            email: 'director1@example.com',
            lastname: 'Doe',
            firstname: 'John',
            phoneNumber: '123-456-7890',
            hdr: false,
            laboratory: '1',
            laboratoryInfo: {
                name: 'Lab1',
                city: 'City1',
                country: 'Country1',
                address: 'Address1',
                means: 'Means1',
                expertise: 'Expertise1',
            },
                
        },
        {
            id: '2',
            email: 'director2@example.com',
            lastname: 'Doe',
            firstname: 'John',
            phoneNumber: '123-456-7890',
            hdr: false,
            laboratory: '1',
            laboratoryInfo: {
                name: 'Lab1',
                city: 'City1',
                country: 'Country1',
                address: 'Address1',
                means: 'Means1',
                expertise: 'Expertise1',
            },
        }
            ];

        // Mocking the repository method
        mockLabDirectorRepository.getAllLabDirectors.mockResolvedValue(labDirectors);

        const result = await labDirectorService.getAllLabDirectors();

        expect(result).toEqual(labDirectors);
        expect(mockLabDirectorRepository.getAllLabDirectors).toHaveBeenCalled();
    });

    it('should get a lab director by id', async () => {
        // Mocking the repository method
        const labDirector: LabDirector = {
            id: '1',
            email: 'director1@example.com',
            lastname: 'Doe',
            firstname: 'John',
            phoneNumber: '123-456-7890',
            hdr: true, // ou false
            laboratory: 'lab-id-1', // ID du labo
        };
        mockLabDirectorRepository.getLabDirectorById.mockResolvedValue([labDirector]);

        const result = await labDirectorService.getLabDirectorById('1', { id: true, email: true });

        expect(result).toEqual(createdLabDirector);
        expect(mockLabDirectorRepository.getLabDirectorById).toHaveBeenCalledWith('1', { id: true, email: true });
    });

    it('should get a lab director by lastname', async () => {
        // Mocking the repository method
        mockLabDirectorRepository.getLabDirectorByLastname.mockResolvedValue(createdLabDirector);

        const result = await labDirectorService.getLabDirectorByLastname('Doe', { id: true, email: true });

        expect(result).toEqual(createdLabDirector);
        expect(mockLabDirectorRepository.getLabDirectorByLastname).toHaveBeenCalledWith('Doe', { id: true, email: true });
    });

    it('should get a lab director by lab id', async () => {
        // Mocking the repository method
        mockLabDirectorRepository.getLabDirectorByLabId.mockResolvedValue([createdLabDirector]);

        const result = await labDirectorService.getLabDirectorByLabId('LabID', { id: true, email: true });

        expect(result).toEqual([createdLabDirector]);
        expect(mockLabDirectorRepository.getLabDirectorByLabId).toHaveBeenCalledWith('LabID', { id: true, email: true });
    });

    it('should get lab directors by laboratory', async () => {
        // Mocking the repository method
        mockLabDirectorRepository.getLabDirectorByLaboratory.mockResolvedValue([createdLabDirector]);

        const result = await labDirectorService.getLabDirectorByLaboratory('LabID', { id: true, email: true });

        expect(result).toEqual([createdLabDirector]);
        expect(mockLabDirectorRepository.getLabDirectorByLaboratory).toHaveBeenCalledWith('LabID', { id: true, email: true });
    });
});
