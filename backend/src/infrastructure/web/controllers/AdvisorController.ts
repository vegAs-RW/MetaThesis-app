import { Request, Response } from "express";
import { AdvisorService } from "../../../domain/services/AdvisorService";
import { Advisor, NewAdvisor } from "../../../domain/entities/Advisor";
import { APIResponse } from "../../../utils/APIResponse";

const advisorService = new AdvisorService();

export const updateAdvisor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const { department, research_area, ifrs, costCenter, establishment, email, firstname, lastname, password, role } = req.body;
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
        if (!advisor) return APIResponse(res, { statusCode: 404, message: "Advisor not found" });

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
        await advisorService.updateAdvisor(updatedAdvisor);

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

