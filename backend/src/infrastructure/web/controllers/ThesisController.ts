import e, { Request, Response } from "express";
import { APIResponse } from "../../../utils/APIResponse";
import { ThesisService } from "../../../domain/services/ThesisService";
import { NewThesis } from "../../../domain/entities/Thesis";

const thesisService = new ThesisService();

/**
 * Controller to create a new thesis.
 * @param {Request} req - The request containing thesis details.
 * @param {Response} res - The response to be sent back to the client.
 */
export const createThesis = async (req: Request, res: Response) => {
    try {
        const { topic, year, domain, scientistInterest, keyword, advisorId } = req.body;
        
        if (!topic.trim() || !year || !domain.trim() || !scientistInterest.trim() || !keyword.trim()|| !advisorId) {
            return APIResponse(res, {
                statusCode: 400,
                message: "Invalid thesis details",
            });
        }

        const newThesis: NewThesis = {
            topic,
            year,
            domain,
            scientistInterest,
            keyword,
            advisorId,
            candidateId: null,
            
        };
        const createdThesis = await thesisService.createInitialThesis(newThesis);

        if (!createdThesis) {
            return APIResponse(res, {
                statusCode: 500,
                message: "Failed to create thesis",
            });
        }
        APIResponse(res, {
            statusCode: 201,
            message: "Thesis created successfully",
            data: createdThesis

        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while creating thesis" });
    }
}

/**
 * Controller to validate a thesis topic.
 * @param {Request} req - Contains the thesis ID and validation details.
 * @param {Response} res - Response to be sent back to the client.
 */
export const validateThesisTopic = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { isValid, refusedTopic } = req.body;
        const result = await thesisService.getThesisById(id, { id: true });
        if (!result) return APIResponse(res, { statusCode: 404, message: "Thesis not found" });

        await thesisService.validateThesisTopic(id, isValid, refusedTopic);

        APIResponse(res, {
            statusCode: 200,
            message: "Thesis topic validated successfully",
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while validating thesis topic" });
    }
}

/**
 * Controller to update the job vacancy of a thesis.
 * @param {Request} req - Contains the thesis ID and vacancy details.
 * @param {Response} res - Response to be sent back to the client.
 */
export const updateJobVacancy = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { vacancy } = req.body;
        const result = await thesisService.getThesisById(id, { id: true });
        if (!result) return APIResponse(res, { statusCode: 404, message: "Thesis not found" });

        await thesisService.updateJobVacancy(id, vacancy);

        APIResponse(res, {
            statusCode: 200,
            message: "Thesis job vacancy updated successfully",
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while updating thesis job vacancy" });
    }
}

/**
 * Controller to assign a candidate to a thesis.
 * @param {Request} req - Contains the thesis ID and candidate ID.
 * @param {Response} res - Response to be sent back to the client.
 */
export const assignCandidateToThesis = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { candidateId } = req.body;
        const result = await thesisService.getThesisById(id, { id: true });
        if (!result) return APIResponse(res, { statusCode: 404, message: "Thesis not found" });

        await thesisService.assignCandidateToThesis(id, candidateId);

        APIResponse(res, {
            statusCode: 200,
            message: "Candidate assigned to thesis successfully",
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while assigning candidate to thesis" });
    }
}

/**
 * Controller to add an ANRT number to a thesis.
 * @param {Request} req - Contains the thesis ID and ANRT number.
 * @param {Response} res - Response to be sent back to the client.
 */
export const addAnrtNumberToThesis = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { anrtNumber } = req.body;
        const result = await thesisService.getThesisById(id, { id: true });
        if (!result) return APIResponse(res, { statusCode: 404, message: "Thesis not found" });

        await thesisService.addAnrtNumberToThesis(id, anrtNumber);

        APIResponse(res, {
            statusCode: 200,
            message: "ANRT number added to thesis successfully",
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while adding ANRT number to thesis" });
    }
}

/**
 * Controller to retrieve all theses.
 * @param {Request} req - The request to fetch theses.
 * @param {Response} res - The response containing the list of theses.
 */
export const getAllTheses = async (req: Request, res: Response) => {
    try {
        const { year, domain, keyword, topicValidation } = req.query;
        const filters = {
            year: year ? Number(year) : undefined,
            domain: domain ? String(domain) : undefined,
            keyword: keyword ? String(keyword) : undefined,
            topicValidation: topicValidation === "true"
        };
        const theses = await thesisService.getAllTheses({ id: true, topic: true, year: true, domain: true, scientistInterest: true, keyword: true, vacancy: true, topicValidation: true, anrtNumber: true, refusedTopic: true, advisorId: true, candidateId: true }, filters);

        APIResponse(res, {
            statusCode: 200,
            message: "Theses fetched successfully",
            data: theses,
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while fetching theses" });
    }
}

/**
 * Controller to retrieve a thesis by its ID.
 * @param {Request} req - Contains the thesis ID in the parameters.
 * @param {Response} res - Response to be sent back to the client.
 */
export const getThesisById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const thesis = await thesisService.getThesisById(id, { id: true, topic: true, year: true, domain: true, scientistInterest: true, keyword: true, vacancy: true, topicValidation: true, anrtNumber: true, refusedTopic: true, advisorId: true, candidateId: true });
        if (!thesis) return APIResponse(res, { statusCode: 404, message: "Thesis not found" });

        APIResponse(res, {
            statusCode: 200,
            message: "Thesis found",
            data: thesis
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while fetching thesis" });
    }
}

export const getThesesByAdvisorId = async (req: Request, res: Response) => {
    const  advisorId  = req.params.id;
    try {
        const theses = await thesisService.getThesesByAdvisorId(advisorId);
        return APIResponse(res, {
            statusCode: 200,
            message: "Theses fetched successfully",
            data: theses,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while fetching theses." });
    }
};
