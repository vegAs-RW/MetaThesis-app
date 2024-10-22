import { beforeAll, describe, expect, it, jest } from '@jest/globals';
import { EstablishmentService } from '../../domain/services/EstablishmentService';
import { EstablishmentRepository } from '../../infrastructure/repositories/EstablishmentRepository';
import { Establishment, NewEstablishment } from '../../domain/entities/Establishment';

// Moquer le EstablishmentRepository
jest.mock('../../infrastructure/repositories/EstablishmentRepository');

describe('EstablishmentService', () => {
    let establishmentService: EstablishmentService;
    let mockEstablishmentRepository: jest.Mocked<EstablishmentRepository>;

    const newEstablishment: NewEstablishment = {
        name: 'New Establishment',
        siret: '12345678901234',
        address: '123 Main St',
        zipcode: '12345',
        city: 'Sample City',
        telephone: '123-456-7890',
    };

    const createdEstablishment: Establishment = {
        id: '2',
        ...newEstablishment,
    };

    beforeAll(() => {
        mockEstablishmentRepository = new EstablishmentRepository() as jest.Mocked<EstablishmentRepository>;
        establishmentService = new EstablishmentService();
        (establishmentService as any).establishmentRepository = mockEstablishmentRepository;
        
    });

    it('should create a new establishment', async () => {
        mockEstablishmentRepository.createEstablishment.mockResolvedValue(createdEstablishment);

        const result = await establishmentService.createEstablishment(newEstablishment);

        expect(result).toEqual(createdEstablishment);
        expect(mockEstablishmentRepository.createEstablishment).toHaveBeenCalledWith(newEstablishment);
    });

    it('should update an existing establishment', async () => {
        const establishmentToUpdate = {
            id: '1',
            name: 'Updated Establishment',
            siret: '12345678901234',
            address: '123 Main St',
            zipcode: '12345',
            city: 'Sample City',
            telephone: '123-456-7890',
        };

        // Mocking the repository method
        (mockEstablishmentRepository.updateEstablishment as jest.Mock).mockImplementation(() => {});

        establishmentService.updateEstablishment(establishmentToUpdate);

        expect(mockEstablishmentRepository.updateEstablishment).toHaveBeenCalledWith(establishmentToUpdate);
    });

    it('should get all establishments', async () => {
        const establishments = [
            { id: '1', name: 'Establishment 1', siret : '4545261456156', address : '123 Main St', zipcode : '12345', city : 'Sample City', telephone : '123-456-7890' },
            { id: '2', name: 'Establishment 2', siret : '4545261f456156', address : '128 Main St', zipcode : '1238545', city : 'Sample Cit5y', telephone : '123-4565-7890' },
        ];

        // Mocking the repository method
        mockEstablishmentRepository.getAllEstablishments.mockResolvedValue(establishments);

        const result = await establishmentService.getAllEstablishments();

        expect(result).toEqual(establishments);
        expect(mockEstablishmentRepository.getAllEstablishments).toHaveBeenCalled();
    });

    it('should get an establishment by id', async () => {
        const establishment = { id: '1', name: 'Establishment 1' };

        // Mocking the repository method
        mockEstablishmentRepository.getEstablishmentById.mockResolvedValue(establishment);

        const result = await establishmentService.getEstablishmentById('1', { id: true, name: true });

        expect(result).toEqual(establishment);
        expect(mockEstablishmentRepository.getEstablishmentById).toHaveBeenCalledWith('1', { id: true, name: true });
    });

    it('should get an establishment by name', async () => {
        const establishment = { id: '1', name: 'Establishment 1' };

        // Mocking the repository method
        mockEstablishmentRepository.getEstablishmentByName.mockResolvedValue(establishment);

        const result = await establishmentService.getEstablishmentByName('Establishment 1', { id: true, name: true });

        expect(result).toEqual(establishment);
        expect(mockEstablishmentRepository.getEstablishmentByName).toHaveBeenCalledWith('Establishment 1', { id: true, name: true });
    });

    it('should delete an establishment', async () => {
        // Mocking the repository method
        (mockEstablishmentRepository.deleteEstablishment as jest.Mock).mockImplementation(() => {});

        await establishmentService.deleteEstablishment('1');

        expect(mockEstablishmentRepository.deleteEstablishment).toHaveBeenCalledWith('1');
    });
});
