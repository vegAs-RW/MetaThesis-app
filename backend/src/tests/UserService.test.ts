import { beforeAll, describe, expect, it, jest } from '@jest/globals';
import { sql } from 'drizzle-orm';
import { UserService } from '../domain/services/UserService';
import { UserRepository } from '../infrastructure/repositories/UserRepository';
import { NewUser, User } from '../domain/entities/User';
import { APIResponse } from '../utils/APIResponse';
import { db } from '../infrastructure/data';
import { QueryResult } from 'pg';

jest.mock("../infrastructure/repositories/UserRepository");

describe('UserService', () => {
    let userService: UserService;
    let mockUserRepository: jest.Mocked<UserRepository>;

    const newUser: NewUser = {
        email: 'Jane.doe@exemple.com',
        firstname: 'Jane',
        lastname: 'Doe',
        password: 'password'
    };

    const sampleUser: User = {
        id: '1',
        email: 'john.doe@exemple.com',
        firstname: 'John',
        lastname: 'Doe',
        password: 'password'
    };

    const mockQueryResult: QueryResult<never> = {
        command: 'INSERT',
        rowCount: 1,
        oid: 1,
        rows: [],
        fields: [],
    };

    beforeAll(() => {
        mockUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
        userService = new UserService();
        userService['userRepository'] = mockUserRepository;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new user', async () => {
        mockUserRepository.createUser.mockResolvedValue(mockQueryResult);

        await userService.createUser(newUser);

        expect(mockUserRepository.createUser).toHaveBeenCalledWith(newUser);
    });

    it('should get all users', async () => {
        mockUserRepository.getAllUsers.mockResolvedValue([sampleUser]);

        const users = await userService.getAllUsers();

        expect(users).toEqual([sampleUser]);
        expect(mockUserRepository.getAllUsers).toHaveBeenCalledTimes(1);
    });

    it('should get a user by email', async () => {
        mockUserRepository.getUserByEmail.mockResolvedValue(sampleUser);

        const user = await userService.getUserByEmail('john.doe@exemple.com', { id: true, email: true, firstname: true, lastname: true });
        expect(user).toEqual(sampleUser);
        expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith('john.doe@exemple.com', { id: true, email: true, firstname: true, lastname: true });
    });

    it('should get a user by id', async () => {
        mockUserRepository.getUserById.mockResolvedValue(sampleUser);

        const user = await userService.getUserById('1');
        expect(user).toEqual(sampleUser);
        expect(mockUserRepository.getUserById).toHaveBeenCalledWith('1', { id: true, email: true, firstname: true, lastname: true });
    });

    it('should update a user', async () => {
        const updatedUser: User = {
            ...sampleUser,
            firstname: 'Louis'
        };
        mockUserRepository.updateUser.mockResolvedValue(mockQueryResult);
        await userService.updateUser(updatedUser);
        expect(mockUserRepository.updateUser).toHaveBeenCalledWith(updatedUser);
    });


});