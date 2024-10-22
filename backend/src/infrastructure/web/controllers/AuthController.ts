import { Request, Response } from "express";
import { AuthService } from "../../../domain/services/AuthService";
import { UserService } from "../../../domain/services/UserService";
import { AdvisorService } from "../../../domain/services/AdvisorService";
import { APIResponse } from "../../../utils/APIResponse";
import bcrypt from "bcrypt";

const authService = new AuthService();
const userService = new UserService();
const advisorService = new AdvisorService();

export const registerAdvisor = async (req: Request, res: Response) => {
    try {
        const { email, password, firstname, lastname, department, research_area, ifrs, costCenter, establishment } = req.body;
        if (!email.trim() || !password.trim() || typeof email !== "string" || typeof password !== "string") {
            return APIResponse(res, {
                statusCode: 400,
                message: "Invalid email or password",
            });
        }
        const existingUser = await userService.getUserByEmail(email, { email: true });
        if (existingUser) return APIResponse(res, { statusCode: 409, message: "Advisor already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await userService.createUser({ email, password: hashedPassword, lastname, firstname });

        if (!newUser || !newUser.id) {
            return APIResponse(res, {
                statusCode: 500,
                message: "Failed to create user",
            });
        }

        await advisorService.createAdvisor({
            id: newUser.id,
            department, 
            research_area, 
            ifrs, 
            costCenter, 
            establishment,
            email: newUser.email,
            firstname: newUser.firstname, // Inclure le prénom de l'utilisateur
            lastname: newUser.lastname, // Inclure le nom de famille de l'utilisateur
            password: hashedPassword, // Inclure le mot de passe (si nécessaire)
            role: "advisor",
        });

        APIResponse(res, {
            statusCode: 201,
            message: "Advisor created successfully",
        });

    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while creating advisor" });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email.trim() || !password.trim() || typeof email !== "string" || typeof password !== "string") {
            return APIResponse(res, {
                statusCode: 400,
                message: "Invalid email or password",
            });
        }
        const user = await userService.getUserByEmail(email, { email: true, password: true });

        if (!user) return APIResponse(res, { statusCode: 404, message: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password as string);

        if (!isPasswordValid) return APIResponse(res, { statusCode: 401, message: "Invalid password" });

        const token = authService.createToken(user.id as string);

        res.cookie("token", token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
            /*sameSite: "strict"
            maxAge: 24  * 60 * 60 * 1000*/
        });

        APIResponse(res, {
            statusCode: 200,
            message: "Login successful",
            data: { token }
        });

    } catch (error) {
        console.error(error);
        APIResponse(res, { statusCode: 500, message: "An error occurred while logging in"
        });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token");
        APIResponse(res, {
            statusCode: 200,
            message: "Logout successful"
        });
    } catch (error) {
        console.error(error);
        APIResponse(res, { statusCode: 500, message: "An error occurred while logging out" });
    }
}