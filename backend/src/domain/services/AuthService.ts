import jwt from "jsonwebtoken";
import env from "../../config/env";

const { JWT_SECRET } = env;

/**
 * Service responsible for handling authentication-related operations
 * such as token generation.
 */
export class AuthService {

    /**
     * Generates a JWT token for a given user ID.
     * @param {string} id - The unique identifier of the user for whom the token is generated.
     * @returns {string} - A signed JWT token valid for 1 hour.
     * @throws {Error} - Throws an error if the JWT_SECRET is not defined or if token creation fails.
     */
    createToken(id: string): string {
        // Ensure the JWT secret is available, otherwise throw an error.
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        try {
            // Generate and return a JWT token, valid for 1 hour, with the user's ID in the payload.
            return jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: "1h" });
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while creating token");
        }
    }
}