import { Request, Response } from "express";
import { AdvisorService } from "../../../domain/services/AdvisorService";
import { Advisor, NewAdvisor } from "../../../domain/entities/Advisor";
import { APIResponse } from "../../../utils/APIResponse";
import { CustomRequest } from "../../../types/custom";
import { AuthService } from "../../../domain/services/AuthService";
import { UserService } from "../../../domain/services/UserService";
import bcrypt from "bcrypt";


const advisorService = new AdvisorService();
const authService = new AuthService();
const userService = new UserService();

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

        await advisorService.createAdvisor({ id: newUser.id, department, research_area, ifrs, costCenter, establishment });

        APIResponse(res, {
            statusCode: 201,
            message: "Advisor created successfully",
        });

    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while creating advisor" });
    }
}

export const updateAdvisor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { department, research_area, ifrs, costCenter, establishment } = req.body;
        const advisor = await advisorService.getAdvisorById(id, { id: true });
        if (!advisor) return APIResponse(res, { statusCode: 404, message: "Advisor not found" });

        await advisorService.updateAdvisor({ id, department, research_area, ifrs, costCenter, establishment });

        APIResponse(res, {
            statusCode: 200,
            message: "Advisor updated successfully",
        });

    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while updating advisor" });
    }
}

/*export const getAdvisorById = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params;
        const advisor = await advisorService.getAdvisorById(id, { id: true, department: true, research_area: true, ifrs: true, costCenter: true, establishment: { id: true, name: true }, users: { email: true, firstname: true, lastname: true } });
        if (!advisor) return APIResponse(res, { statusCode: 404, message: "Advisor not found" });

        APIResponse(res, {
            statusCode: 200,
            message: "Advisor found",
            data: advisor
        });

    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while fetching advisor" });
    }
}*/

