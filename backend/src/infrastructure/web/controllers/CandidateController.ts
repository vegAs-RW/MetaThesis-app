import { Request, Response } from "express";
import { CandidateService } from "../../../domain/services/CandidateService";
import { NewCandidate } from "../../../domain/entities/Candidate";
import { APIResponse } from "../../../utils/APIResponse";
import { CustomRequest } from "../../../types/custom";


const candidateService = new CandidateService();

export const createCandidate = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, birthdate, lastDegree, dateLastDegree, doctoralSchool, residentPermit, advisor } = req.body;
        const newCandidate: NewCandidate = { firstname, lastname, birthdate, lastDegree, dateLastDegree, doctoralSchool, residentPermit, advisor };
        const candidate = await candidateService.createCandidate(newCandidate);
        if (!candidate) {
            return APIResponse(res, {
                statusCode: 500,
                message: "Failed to create candidate",
            });
        }
        APIResponse(res, {
            statusCode: 201,
            message: "Candidate created successfully",
            data: candidate
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while creating candidate" });
    }
}

export const updateCandidate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, birthdate, lastDegree, dateLastDegree, doctoralSchool, residentPermit, advisor, hrValidation, zrrValidation, committeeValidation } = req.body;
        const candidate = await candidateService.getCandidateById(id, { id: true });
        if (!candidate) return APIResponse(res, { statusCode: 404, message: "Candidate not found" });

        await candidateService.updateCandidate({ id, firstname, lastname, birthdate, lastDegree, dateLastDegree, doctoralSchool, residentPermit, hrValidation, zrrValidation, committeeValidation, advisor });

        APIResponse(res, {
            statusCode: 200,
            message: "Candidate updated successfully",
        });

    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while updating candidate" });
    }
}

export const getAllCandidates = async (req: Request, res: Response) => {
    try {
        const candidates = await candidateService.getAllCandidates();
        APIResponse(res, {
            statusCode: 200,
            message: "Candidates found",
            data: candidates
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while fetching candidates" });
    }
}

export const getCandidateById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const candidate = await candidateService.getCandidateById(id, { id: true, firstname: true, lastname: true, birthdate: true, lastDegree: true, dateLastDegree: true, doctoralSchool: true, residentPermit: true, committeeValidation: true, hrValidation: true, zrrValidation: true, advisor: true });
        if (!candidate) return APIResponse(res, { statusCode: 404, message: "Candidate not found" });

        APIResponse(res, {
            statusCode: 200,
            message: "Candidate found",
            data: candidate
        });

    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while fetching candidate" });
    }
}

export const getCandidateByAdvisor = async (req: Request, res: Response) => {
    try {
        const { advisor } = req.params;
        const candidates = await candidateService.getCandidateByAdvisor(advisor, { id: true, firstname: true, lastname: true, birthdate: true, lastDegree: true, dateLastDegree: true, doctoralSchool: true, residentPermit: true, committeeValidation: true, hrValidation: true, zrrValidation: true, advisor: true });
        if (!candidates) return APIResponse(res, { statusCode: 404, message: "Candidates not found" });

        APIResponse(res, {
            statusCode: 200,
            message: "Candidates found",
            data: candidates
        });

    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while fetching candidates" });
    }
}

export const deleteCandidate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await candidateService.deleteCandidate(id);
        APIResponse(res, {
            statusCode: 200,
            message: "Candidate deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while deleting candidate" });
    }
}