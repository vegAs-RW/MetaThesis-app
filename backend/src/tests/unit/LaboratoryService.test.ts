import { beforeAll, describe, expect, it, jest } from '@jest/globals';
import { LaboratoryService } from '../../domain/services/LaboratoryService';
import { LaboratoryRepository } from '../../infrastructure/repositories/LaboratoryRepository';
import { LabDirectorRepository } from '../../infrastructure/repositories/LabDirectorRepository';
import { NewLaboratory, Laboratory } from '../../domain/entities/Laboratory';
import { NewLabDirector } from '../../domain/entities/LabDirector';

// Moquer les repos
jest.mock('../../infrastructure/repositories/LaboratoryRepository');
jest.mock('../../infrastructure/repositories/LabDirectorRepository');

describe('LaboratoryService', () => {
    let laboratoryService: LaboratoryService;
    let mockLaboratoryRepository: jest.Mocked<LaboratoryRepository>;
    let mockLabDirectorRepository: jest.Mocked<LabDirectorRepository>;

    const newLaboratory: NewLaboratory = {
        name: 'New Laboratory',
        address: '123 Lab St',
        city: 'Sample City',
        country: 'Sample Country',
        means: 'Sample Means',
        expertise: 'Sample Expertise',
    };

    const newLabDirector: NewLabDirector = {
        lastname: 'Director Name',
        firstname: 'Director Firstname',
        email: 'director@example.com',
        phoneNumber: '123-456-7890',
        hdr: true,
        laboratory: '', // will be set later
    };

    const createdLaboratory: Laboratory = {
        id: '1',
        ...newLaboratory,
    };

    beforeAll(() => {
        mockLaboratoryRepository = new LaboratoryRepository() as jest.Mocked<LaboratoryRepository>;
        mockLabDirectorRepository = new LabDirectorRepository() as jest.Mocked<LabDirectorRepository>;
        laboratoryService = new LaboratoryService();

        // Injection des mocks dans le service
        (laboratoryService as any).laboratoryRepository = mockLaboratoryRepository;
        (laboratoryService as any).directorRepository = mockLabDirectorRepository;
    });

    it('should create a new laboratory with a director', async () => {
        mockLaboratoryRepository.createLaboratory.mockResolvedValue(createdLaboratory);

        // Mock pour le directeur
        mockLabDirectorRepository.createLabDirector.mockResolvedValue(undefined); // Suppose que cette méthode ne retourne rien

        const result = await laboratoryService.createLaboratory(newLaboratory, newLabDirector);

        expect(result).toEqual(createdLaboratory);
        expect(mockLaboratoryRepository.createLaboratory).toHaveBeenCalledWith(newLaboratory);
        expect(mockLabDirectorRepository.createLabDirector).toHaveBeenCalledWith({
            ...newLabDirector,
            laboratory: createdLaboratory.id,
        });
    });

    it('should update an existing laboratory', async () => {
        const laboratoryToUpdate: Laboratory = {
            id: '1',
            name: 'Updated Laboratory',
            address: '456 Lab St',
            city: 'Updated City',
            country: 'Updated Country',
            means: 'Updated Means',
            expertise: 'Updated Expertise',
        };

        // Mocking the repository method
        (mockLaboratoryRepository.updateLaboratory as jest.Mock).mockImplementation(() => {});

        laboratoryService.updateLaboratory(laboratoryToUpdate);

        expect(mockLaboratoryRepository.updateLaboratory).toHaveBeenCalledWith(laboratoryToUpdate);
    });

    it('should get all laboratories', async () => {
        const laboratories = [createdLaboratory];

        // Mocking the repository method
        mockLaboratoryRepository.getAllLaboratories.mockResolvedValue(laboratories);

        const result = await laboratoryService.getAllLaboratories();

        expect(result).toEqual(laboratories);
        expect(mockLaboratoryRepository.getAllLaboratories).toHaveBeenCalled();
    });

    it('should get a laboratory by id', async () => {
        // Mocking the repository method
        mockLaboratoryRepository.getLaboratoryById.mockResolvedValue(createdLaboratory);

        const result = await laboratoryService.getLaboratoryById('1', { id: true, name: true });

        expect(result).toEqual(createdLaboratory);
        expect(mockLaboratoryRepository.getLaboratoryById).toHaveBeenCalledWith('1', { id: true, name: true });
    });

    it('should get a laboratory by name', async () => {
        // Mocking the repository method
        mockLaboratoryRepository.getLaboratoryByName.mockResolvedValue(createdLaboratory);

        const result = await laboratoryService.getLaboratoryByName('New Laboratory', { id: true, name: true });

        expect(result).toEqual(createdLaboratory);
        expect(mockLaboratoryRepository.getLaboratoryByName).toHaveBeenCalledWith('New Laboratory', { id: true, name: true });
    });

    it('should get a laboratory by city', async () => {
        // Mocking the repository method
        mockLaboratoryRepository.getLaboratoryByCity.mockResolvedValue([createdLaboratory]);

        const result = await laboratoryService.getLaboratoryByCity('Sample City', { id: true, name: true });

        expect(result).toEqual([createdLaboratory]);
        expect(mockLaboratoryRepository.getLaboratoryByCity).toHaveBeenCalledWith('Sample City', { id: true, name: true });
    });

    it('should get a laboratory by country', async () => {
        // Mocking the repository method
        mockLaboratoryRepository.getLaboratoryByCountry.mockResolvedValue([createdLaboratory]);

        const result = await laboratoryService.getLaboratoryByCountry('Sample Country', { id: true, name: true });

        expect(result).toEqual([createdLaboratory]);
        expect(mockLaboratoryRepository.getLaboratoryByCountry).toHaveBeenCalledWith('Sample Country', { id: true, name: true });
    });
});
