import jwt from "jsonwebtoken";
import env from "../../config/env";

import { User } from "../entities/User";

const { JWT_SECRET } = env;

export class AuthService {

    createToken(id: string): string {
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        try {
            return jwt.sign({ userId: id}, JWT_SECRET, { expiresIn: "1h" });
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while creating token");
        }
    }
}