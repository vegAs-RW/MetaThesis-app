import { db } from "../data";
import { User, InsertUser, UserColumns } from "../../domain/entities/User";
import { users } from "../data/schema";
import { eq } from "drizzle-orm";

/**
 * Repository qui gère le CRUD des utilisateurs
 */
export class UserRepository {

    /**
     * Récupère tous les utilisateurs avec une sélection partielle des colonnes (id, email, lastname, firstname)
     * @returns {Promise<Partial<User>[]>} - Une promesse contenant une liste d'utilisateurs avec les colonnes spécifiées
     */
    getAllUsers(): Promise<Partial<User>[]> {
        try {
            return db.query.users.findMany({
                columns: {
                    id: true,
                    email: true,
                    lastname: true,
                    firstname: true
                }
            });
        } catch(error) {
        console.error(error);
        throw new Error("An error occurred while fetching users")
        }
    }

    /**
     * Récupère un utilisateur par son identifiant
     * @param {string} id - L'identifiant de l'utilisateur à rechercher
     * @param {UserColumns} columns - Les colonnes à sélectionner
     * @returns {Promise<Partial<User | undefined>>} - Une promesse contenant l'utilisateur correspondant ou undefined
     */
    getUserById(id: string, columns: UserColumns): Promise<Partial<User | undefined>> {
        try {
            return db.query.users.findFirst({
                where: 
                    eq(users.id, id),
                columns
            });
        } catch(error) {
            console.error(error);
            throw new Error("An error occurred while fetching user")
        }
    }

    /**
     * Récupère un utilisateur par son email
     * @param {string} email - L'email de l'utilisateur à rechercher
     * @param {UserColumns} columns - Les colonnes à sélectionner
     * @returns {Promise<Partial<User | undefined>>} - Une promesse contenant l'utilisateur correspondant ou undefined
     */
    getUserByEmail(email: string, columns: UserColumns): Promise<Partial<User | undefined>> {
        try {
            return db.query.users.findFirst({
                where: 
                    eq(users.email, email),
                columns
            });
        } catch(error) {
            console.error(error);
            throw new Error("An error occurred while fetching user")
        }
    }

     /**
     * Récupère un utilisateur par son nom de famille (lastname)
     * @param {string} lastname - Le nom de famille de l'utilisateur à rechercher
     * @param {UserColumns} columns - Les colonnes à sélectionner
     * @returns {Promise<Partial<User | undefined>>} - Une promesse contenant l'utilisateur correspondant ou undefined
     */
    getUserByLastname(lastname: string, columns: UserColumns): Promise<Partial<User | undefined>> {
        try {
            return db.query.users.findFirst({
                where: 
                    eq(users.lastname, lastname),
                columns
            });
        } catch(error) {
            console.error(error);
            throw new Error("An error occurred while fetching user")
        }
    }

    /**
     * Crée un nouvel utilisateur dans la base de données
     * @param {InsertUser} user - L'objet utilisateur à insérer
     * @returns {Promise<void>} - Une promesse indiquant que l'utilisateur a été créé
     */
    createUser(user: InsertUser) { 
        try {
            return db.insert(users).values(user).execute();
        } catch(error) {
            console.error(error);
            throw new Error("An error occurred while creating user")
        }
    }

    /**
     * Met à jour un utilisateur existant dans la base de données
     * @param {User} user - L'objet utilisateur avec les nouvelles données à mettre à jour
     * @returns {Promise<void>} - Une promesse indiquant que l'utilisateur a été mis à jour
     */
    updateUser(user: User) {
        try {
            return db.update(users).set(user).where(eq(users.id, user.id)).execute();
        } catch(error) {
            console.error(error);
            throw new Error("An error occurred while updating user")
        }
    }
}   