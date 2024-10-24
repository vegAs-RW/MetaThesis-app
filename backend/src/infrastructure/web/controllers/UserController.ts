import { Request, Response } from "express";
import { UserService } from "../../../domain/services/UserService";
import { User } from "../../../domain/entities/User";
import { CustomRequest } from "../../../types/custom";
import { AuthService } from "../../../domain/services/AuthService";
import { APIResponse } from "../../../utils/APIResponse";
import bcrypt from "bcrypt";

const userService = new UserService();

/**
 * Controller to retrieve a user by their email address.
 * @param {Request} req - The request containing the user's email.
 * @param {Response} res - The response to be sent back to the client.
 */
export const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
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

/**
 * Controller to update a user's information.
 * @param {CustomRequest} req - The request containing the user's ID and updated data.
 * @param {Response} res - The response to be sent back to the client.
 */
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