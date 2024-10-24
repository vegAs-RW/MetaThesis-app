import { NewUser, User, UserColumns } from "../entities/User";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";

/**
 * Service class responsible for managing business logic related to users.
 * Utilizes the UserRepository to interact with the database.
 */
export class UserService {
    private userRepository: UserRepository;

    /**
     * Initializes the UserService and sets up the UserRepository.
     */
    constructor() {
        this.userRepository = new UserRepository();
    }

    /**
     * Retrieves all users from the database.
     * @returns {Promise<Partial<User>[]>} - A promise containing a list of users with specified columns.
     */
    async getAllUsers() {
        return await this.userRepository.getAllUsers();
    }

    /**
     * Retrieves a user by their identifier.
     * @param {string} id - The identifier of the user to search for.
     * @returns {Promise<Partial<User | undefined>>} - A promise containing the user with specified columns or undefined if not found.
     */
    async getUserById(id: string) {
        return await this.userRepository.getUserById(id, { id: true, email: true, lastname: true, firstname: true });
    }

    /**
     * Retrieves a user by their email address.
     * @param {string} email - The email of the user to search for.
     * @param {UserColumns} columns - The columns to select from the user entity.
     * @returns {Promise<Partial<User | undefined>>} - A promise containing the user with specified columns or undefined if not found.
     */
    async getUserByEmail(email: string, columns: UserColumns):Promise<Partial<User | undefined>> {
        return await this.userRepository.getUserByEmail(email, { id: true, email: true, lastname: true, firstname: true, password: true, role: true });
    }

    /**
     * Retrieves a user by their last name.
     * @param {string} lastname - The last name of the user to search for.
     * @returns {Promise<Partial<User | undefined>>} - A promise containing the user with specified columns or undefined if not found.
     */
    async getUserByLastname(lastname: string) {
        return await this.userRepository.getUserByLastname(lastname, { id: true, email: true, lastname: true, firstname: true });
    }

    /**
     * Creates a new user in the database.
     * @param {NewUser} user - The data of the user to be inserted.
     * @returns {Promise<NewUser>} - A promise that resolves to the newly created user object.
     */
    async createUser(user: NewUser): Promise<NewUser> {
        return await this.userRepository.createUser(user);
    }

    /**
     * Updates an existing user in the database.
     * @param {User} updatedUser - The updated data of the user.
     * @returns {Promise<void>} - A promise that resolves once the user has been updated.
     */
    async updateUser(updatedUser: User): Promise<void> {
        await this.userRepository.updateUser(updatedUser);
    }
}