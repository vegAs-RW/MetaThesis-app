import { db } from "../data";
import { User, NewUser, UserColumns } from "../../domain/entities/User";
import { users } from "../data/schema";
import { eq } from "drizzle-orm";

/**
 * Repository managing CRUD operations for users
 */
export class UserRepository {

    /**
     * Retrieves all users with a partial selection of columns (id, email, lastname, firstname)
     * @returns {Promise<Partial<User>[]>} - A promise containing a list of users with the specified columns
     * @throws {Error} - Throws an error if the retrieval fails
     */
    async getAllUsers(): Promise<Partial<User>[]> {
        try {
            return await db.query.users.findMany({
                columns: {
                    id: true,
                    email: true,
                    lastname: true,
                    firstname: true
                }
            });
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching users")
        }
    }

   /**
     * Retrieves a user by their ID
     * @param {string} id - The ID of the user to find
     * @param {UserColumns} columns - The columns to select
     * @returns {Promise<Partial<User | undefined>>} - A promise containing the corresponding user or undefined
     * @throws {Error} - Throws an error if the retrieval fails
     */
    getUserById(id: string, columns: UserColumns): Promise<Partial<User | undefined>> {
        try {
            return db.query.users.findFirst({
                where:
                    eq(users.id, id),
                columns
            });
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching user")
        }
    }

    /**
     * Retrieves a user by their email
     * @param {string} email - The email of the user to find
     * @param {UserColumns} columns - The columns to select
     * @returns {Promise<Partial<User | undefined>>} - A promise containing the corresponding user or undefined
     * @throws {Error} - Throws an error if the retrieval fails
     */
    getUserByEmail(email: string, columns: UserColumns): Promise<Partial<User | undefined>> {
        try {
            return db.query.users.findFirst({
                where:
                    eq(users.email, email),
                columns
            });
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching user")
        }
    }

     /**
     * Retrieves a user by their last name (lastname)
     * @param {string} lastname - The lastname of the user to find
     * @param {UserColumns} columns - The columns to select
     * @returns {Promise<Partial<User | undefined>>} - A promise containing the corresponding user or undefined
     * @throws {Error} - Throws an error if the retrieval fails
     */
    getUserByLastname(lastname: string, columns: UserColumns): Promise<Partial<User | undefined>> {
        try {
            return db.query.users.findFirst({
                where:
                    eq(users.lastname, lastname),
                columns
            });
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching user")
        }
    }

    /**
     * Creates a new user in the database
     * @param {NewUser} user - The user object to insert
     * @returns {Promise<User>} - A promise containing the created user
     * @throws {Error} - Throws an error if the creation fails
     */
    async createUser(user: NewUser): Promise<User> {
        try {
            const [createdUser] = await db.insert(users).values(user).returning();
            return createdUser;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while creating user")
        }
    }

    /**
     * Updates an existing user in the database
     * @param {Partial<User>} user - The user object with the updated data
     * @returns {Promise<void>} - A promise indicating that the user has been updated
     * @throws {Error} - Throws an error if the update fails
     */
    async updateUser(user: Partial<User>): Promise<void> {
        try {
            await db.update(users)
                .set(user)
                .where(eq(users.id, user.id!))
                .execute();
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while updating user")
        }
    }
}   