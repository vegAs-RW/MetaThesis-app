import { Request, Response } from "express";
import { UserService } from "../../../domain/services/UserService";
import { User } from "../../../domain/entities/User";
import { CustomRequest } from "../../../types/custom";
import { AuthService } from "../../../domain/services/AuthService";
import { APIResponse } from "../../../utils/APIResponse";
import bcrypt from "bcrypt";


const userService = new UserService();
const authService = new AuthService();

// Maybe to delete, have an advisor register in AdvisorController
export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, firstname, lastname } = req.body;
        if (!email.trim() || !password.trim() || typeof email !== "string" || typeof password !== "string") {
            return APIResponse(res, {
                statusCode: 400,
                message: "Invalid email or password",
            });
        }
        const existingUser = await userService.getUserByEmail(email, { email: true });

        if (existingUser) return APIResponse(res, { statusCode: 409, message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        userService.createUser({ email, password: hashedPassword, lastname, firstname });

        APIResponse(res, {
            statusCode: 201,
            message: "User created successfully",
        });

    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while creating user", data: null });
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
        });

        APIResponse(res, {
            statusCode: 200,
            message: "Login successful"
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

export const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const {email} = req.body;
        const user = userService.getUserByEmail(email, { email: true, firstname: true, lastname: true });

        if (!user) return APIResponse(res, { statusCode: 404, message: "User not found" });

        APIResponse(res, {
            statusCode: 200,
            message: "User found",
            data: user
        });

    } catch (error) {
        console.error(error);
        APIResponse(res, { statusCode: 500, message: "An error occurred while fetching user" });
    }
}

export const updateUser = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.params.id;

        let updatedUserData: User = req.body;

        if (updatedUserData.password) {
            const hashedPassword = await bcrypt.hash(updatedUserData.password, 12);
            updatedUserData = { ...updatedUserData, password: hashedPassword }; 
        }

        const updatedUser: User = { ...updatedUserData, id: userId };

        userService.updateUser(updatedUser);

        APIResponse(res, {
            statusCode: 200,
            message: "User updated successfully"
        });

    } catch (error) {
        console.error(error);
        APIResponse(res, { statusCode: 500, message: "An error occurred while updating user" });
    }
}