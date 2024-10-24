import { Request, Response } from "express";
import { AuthService } from "../../../domain/services/AuthService";
import { UserService } from "../../../domain/services/UserService";
import { AdvisorService } from "../../../domain/services/AdvisorService";
import { APIResponse } from "../../../utils/APIResponse";
import bcrypt from "bcrypt";

const authService = new AuthService();
const userService = new UserService();
const advisorService = new AdvisorService();

/**
 * Controller to handle the registration of a new advisor.
 * @param {Request} req - The request object containing the advisor's registration data.
 * @param {Response} res - The response object to send data back to the client.
 */
export const registerAdvisor = async (req: Request, res: Response) => {
    try {
        // Destructuring the necessary fields from the request body
        const { email, password, firstname, lastname, department, research_area, ifrs, costCenter, establishment } = req.body;
        // Input validation for email and password
        if (!email.trim() || !password.trim() || typeof email !== "string" || typeof password !== "string") {
            return APIResponse(res, {
                statusCode: 400,
                message: "Invalid email or password",
            });
        }
        // Checking if the user already exists
        const existingUser = await userService.getUserByEmail(email, { email: true });
        if (existingUser) return APIResponse(res, { statusCode: 409, message: "Advisor already exists" });

        // Hashing the password for secure storage
        const hashedPassword = await bcrypt.hash(password, 12);

        // Creating a new user in the system
        const newUser = await userService.createUser({ email, password: hashedPassword, lastname, firstname, role: "advisor" });

        // Handling the case where user creation fails
        if (!newUser || !newUser.id) {
            return APIResponse(res, {
                statusCode: 500,
                message: "Failed to create user",
            });
        }

        // Creating an advisor linked to the new user
        await advisorService.createAdvisor({
            id: newUser.id,
            department,
            research_area,
            ifrs,
            costCenter,
            establishment,
            email: newUser.email,
            firstname: newUser.firstname, 
            lastname: newUser.lastname, 
            password: hashedPassword, 
            role: "advisor",
        });

        // Sending a success response
        APIResponse(res, {
            statusCode: 201,
            message: "Advisor created successfully",
        });

    } catch (error) {
        // Logging the error and sending a generic error response
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while creating advisor" });
    }
}

/**
 * Controller to handle user login.
 * @param {Request} req - The request object containing login credentials.
 * @param {Response} res - The response object to send data back to the client.
 */
export const login = async (req: Request, res: Response) => {
    try {
        // Destructuring email and password from the request body
        const { email, password } = req.body;
        // Input validation for email and password
        if (!email.trim() || !password.trim() || typeof email !== "string" || typeof password !== "string") {
            return APIResponse(res, {
                statusCode: 400,
                message: "Invalid email or password",
            });
        }
        // Fetching user details by email
        const user = await userService.getUserByEmail(email, { email: true, password: true });

        // Handling case where user is not found
        if (!user) return APIResponse(res, { statusCode: 404, message: "User not found" });

        // Validating the provided password against the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password as string);

        // Handling invalid password case
        if (!isPasswordValid) return APIResponse(res, { statusCode: 401, message: "Invalid password" });

        // Creating a token for the user
        const token = authService.createToken(user.id as string);

        // Setting a secure cookie with the token
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
            /*sameSite: "strict"
            maxAge: 24  * 60 * 60 * 1000*/
        });

        // Sending a success response with the token
        APIResponse(res, {
            statusCode: 200,
            message: "Login successful",
            data: { token: token, role: user.role }
        });

    } catch (error) {
        // Logging the error and sending a generic error response
        console.error(error);
        APIResponse(res, {
            statusCode: 500, message: "An error occurred while logging in"
        });
    }
}

/**
 * Controller to handle user logout.
 * @param {Request} req - The request object for logout action.
 * @param {Response} res - The response object to send data back to the client.
 */
export const logout = async (req: Request, res: Response) => {
    try {
        // Clearing the authentication token cookie
        res.clearCookie("token");
        // Sending a success response
        APIResponse(res, {
            statusCode: 200,
            message: "Logout successful"
        });
    } catch (error) {
        // Logging the error and sending a generic error response
        console.error(error);
        APIResponse(res, { statusCode: 500, message: "An error occurred while logging out" });
    }
}