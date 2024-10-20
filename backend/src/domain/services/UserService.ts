import { NewUser, User, UserColumns } from "../entities/User";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";

/**
 * Service qui gère la logique métier pour les utilisateurs.
 * Utilise le UserRepository pour interagir avec la base de données.
 */
export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository =  new UserRepository();
    }

    /**
     * Récupère tous les utilisateurs
     * @returns {Promise<Partial<User>[]>} - Une promesse contenant une liste d'utilisateurs avec les colonnes spécifiées
     */
    getAllUsers() {
        return this.userRepository.getAllUsers();
    }

    /**
     * Récupère un utilisateur par son identifiant
     * @param {string} id - L'identifiant de l'utilisateur à rechercher
     * @returns {Promise<Partial<User | undefined>>} - Une promesse contenant l'utilisateur avec les colonnes spécifiées ou undefined
     */
    getUserById(id: string) {
        return this.userRepository.getUserById(id, {id: true, email: true, lastname: true, firstname: true});
    }

    /**
     * Récupère un utilisateur par son email
     * @param {string} email - L'email de l'utilisateur à rechercher
     * @param {UserColumns} columns - Les colonnes à sélectionner
     * @returns {Promise<Partial<User | undefined>>} - Une promesse contenant l'utilisateur avec les colonnes spécifiées ou undefined
     */
    getUserByEmail(email: string, columns: UserColumns) {
        return this.userRepository.getUserByEmail(email, {id: true, email: true, lastname: true, firstname: true});
    }

    /**
     * Récupère un utilisateur par son nom de famille
     * @param {string} lastname - Le nom de famille de l'utilisateur à rechercher
     * @returns {Promise<Partial<User | undefined>>} - Une promesse contenant l'utilisateur avec les colonnes spécifiées ou undefined
     */
    getUserByLastname(lastname: string) {
        return this.userRepository.getUserByLastname(lastname, {id: true, email: true, lastname: true, firstname: true});
    }

    /**
     * Crée un nouvel utilisateur
     * @param {NewUser} user - Les données de l'utilisateur à insérer
     * @returns {void} - Aucune valeur de retour
     */
    async createUser(user: NewUser): Promise<NewUser> {
        return this.userRepository.createUser(user);
    }

    /**
     * Met à jour un utilisateur
     * @param {User} updatedUser - Les données de l'utilisateur à mettre à jour
     * @returns {void} - Aucune valeur de retour
     */
    updateUser(updatedUser: User): void {
        this.userRepository.updateUser(updatedUser);
    }
}