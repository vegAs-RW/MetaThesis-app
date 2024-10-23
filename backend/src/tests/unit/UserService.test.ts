import { beforeAll, describe, expect, it, jest } from '@jest/globals';
import { UserService } from '../../domain/services/UserService';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { NewUser, User } from '../../domain/entities/User';
import { QueryResult } from 'pg';

jest.mock("../../infrastructure/repositories/UserRepository");

describe('UserService', () => {
    let userService: UserService;
    let mockUserRepository: jest.Mocked<UserRepository>;

    const newUser: NewUser = {
        email: 'jane.doe@example.com',
        firstname: 'Jane',
        lastname: 'Doe',
        password: 'password',
        role: 'advisor' // Ajoutez un rôle ici pour éviter l'erreur
    };

    const sampleUser: User = {
        id: '1',
        email: 'john.doe@example.com',
        firstname: 'John',
        lastname: 'Doe',
        password: 'password',
        role: 'advisor' // Ajoutez un rôle ici pour éviter l'erreur
    };

    beforeAll(() => {
        mockUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
        userService = new UserService();
        (userService as any).userRepository = mockUserRepository;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get all users', async () => {
        mockUserRepository.getAllUsers.mockResolvedValue([sampleUser]);

        const users = await userService.getAllUsers();

        expect(users).toEqual([sampleUser]);
        expect(mockUserRepository.getAllUsers).toHaveBeenCalledTimes(1);
    });

    it('should get a user by email', async () => {
        mockUserRepository.getUserByEmail.mockResolvedValue(sampleUser);

        const user = await userService.getUserByEmail('john.doe@example.com', { id: true, email: true, firstname: true, lastname: true });
        expect(user).toEqual(sampleUser);
        expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith('john.doe@example.com', { id: true, email: true, firstname: true, lastname: true });
    });

    it('should get a user by id', async () => {
        mockUserRepository.getUserById.mockResolvedValue(sampleUser);

        const user = await userService.getUserById('1');
        expect(user).toEqual(sampleUser);
        expect(mockUserRepository.getUserById).toHaveBeenCalledWith('1', { id: true, email: true, firstname: true, lastname: true });
    });

    it('should create a new user', async () => {
        const createdUser: User = {
            id: '2',
            ...newUser,
            role: 'advisor'
        };
        mockUserRepository.createUser.mockResolvedValue(createdUser);

        const result = await userService.createUser(newUser);

        expect(result).toEqual(createdUser);
        expect(mockUserRepository.createUser).toHaveBeenCalledWith(newUser);
    });

    it('should update a user', async () => {
        const updatedUser: User = {
            ...sampleUser,
            firstname: 'Louis'
        };
        mockUserRepository.updateUser.mockResolvedValue(undefined);
        await userService.updateUser(updatedUser);
        expect(mockUserRepository.updateUser).toHaveBeenCalledWith(updatedUser);
    });
});
