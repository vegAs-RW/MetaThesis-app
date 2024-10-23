import { Request, Response } from "express";
import { AdvisorService } from "../../../domain/services/AdvisorService";
import { Advisor, NewAdvisor } from "../../../domain/entities/Advisor";
import { APIResponse } from "../../../utils/APIResponse";

const advisorService = new AdvisorService();

/**
 * Controller to handle the updating of an advisor.
 * @param {Request} req - The request object from the client, containing the advisor ID and updated data.
 * @param {Response} res - The response object to send data back to the client.
 */
export const updateAdvisor = async (req: Request, res: Response) => {
    try {
        // Extracting the advisor ID from the request parameters
        const { id } = req.params;

        // Extracting the updated data from the request body
        const { department, research_area, ifrs, costCenter, establishment, email, firstname, lastname, password, role } = req.body;

        // Fetching the advisor from the database by ID
        const advisor = await advisorService.getAdvisorById(id, {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            password: true,
            role: true,
            department: true,
            research_area: true,
            ifrs: true,
            costCenter: true,
            establishment: true,
        });

        // If the advisor is not found, return a 404 error
        if (!advisor) return APIResponse(res, { statusCode: 404, message: "Advisor not found" });

        // Constructing the updated advisor object with new values or existing ones if not provided
        const updatedAdvisor: Advisor = {
            id,
            department: department || advisor.department,
            research_area: research_area || advisor.research_area,
            ifrs: ifrs || advisor.ifrs,
            costCenter: costCenter || advisor.costCenter,
            establishment: establishment || advisor.establishment,
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: password,
            role: role
        };
        // Updating the advisor using the AdvisorService
        await advisorService.updateAdvisor(updatedAdvisor);

        // Sending a success response
        APIResponse(res, {
            statusCode: 200,
            message: "Advisor updated successfully",
        });

    } catch (error) {
        // Logging the error and returning a 500 response in case of an exception
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

