import e, { Request, Response } from "express";
import { APIResponse } from "../../../utils/APIResponse";
import { ThesisService } from "../../../domain/services/ThesisService";
import { NewThesis } from "../../../domain/entities/Thesis";

const thesisService = new ThesisService();

export const createThesis = async (req: Request, res: Response) => {
    try {
        const { topic, year, domain, scientistInterest, keyword, vacancy, topicValidation, anrtNumber } = req.body;
        const advisorId = req.user?.userId;
        if (!topic.trim() || !year || !domain.trim() || !scientistInterest.trim() || !keyword.trim() || !advisorId.trim()) {
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
            vacancy: vacancy || null, 
            topicValidation: topicValidation || false, 
            anrtNumber: anrtNumber || null, 
            };
        const createdThesis = await thesisService.createInitialThesis(newThesis, advisorId);

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

export const getAllTheses = async (req: Request, res: Response) => {
    try {
        const { year, domain, keyword, topicValidation } = req.query;
        const filters = { 
            year: year ? Number(year) : undefined, 
            domain: domain ? String(domain): undefined, 
            keyword: keyword ? String(keyword) : undefined, 
            topicValidation: topicValidation === "true" };
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
