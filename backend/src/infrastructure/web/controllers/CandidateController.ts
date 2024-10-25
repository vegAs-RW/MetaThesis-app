import { Request, Response } from "express";
import { CandidateService } from "../../../domain/services/CandidateService";
import { APIResponse } from "../../../utils/APIResponse";
import { CustomRequest } from "../../../types/custom";


const candidateService = new CandidateService();

/**
 * Controller to handle the creation of a new candidate.
 * @param {CustomRequest} req - The request object containing the candidate's data.
 * @param {Response} res - The response object to send data back to the client.
 */
export const createCandidate = async (req: CustomRequest, res: Response) => {
    try {
        // Destructuring necessary fields from the request body
        const { firstname, lastname, birthdate, lastDegree, dateLastDegree, doctoralSchool, residentPermit, advisor} = req.body;
        // Creating a new candidate object with advisor ID and validation fields
        const newCandidate = { firstname, lastname, birthdate, lastDegree, dateLastDegree, doctoralSchool, residentPermit, advisor: advisor, hrValidation: false, zrrValidation: false, committeeValidation: false };
        // Creating the new candidate through the service
        const createdCandidate = await candidateService.createCandidate(newCandidate);
        // Handling the case where candidate creation fails
        if (!createdCandidate) {
            return APIResponse(res, {
                statusCode: 500,
                message: "Failed to create candidate",
            });
        }
        // Sending a success response with the created candidate
        APIResponse(res, {
            statusCode: 201,
            message: "Candidate created successfully",
            data: { candidate: createdCandidate }
        });
    } catch (error) {
        // Logging the error and sending a generic error response
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while creating candidate" });
    }
}

/**
 * Controller to handle the updating of an existing candidate.
 * @param {Request} req - The request object containing the candidate's updated data.
 * @param {Response} res - The response object to send data back to the client.
 */
export const updateCandidate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, birthdate, lastDegree, dateLastDegree, doctoralSchool, residentPermit, advisor, hrValidation, zrrValidation, committeeValidation } = req.body;
        // Fetching the candidate by ID to ensure it exists
        const candidate = await candidateService.getCandidateById(id);
        if (!candidate) return APIResponse(res, { statusCode: 404, message: "Candidate not found" });

        // Updating the candidate's information using the service
        await candidateService.updateCandidate({ id, firstname, lastname, birthdate, lastDegree, dateLastDegree, doctoralSchool, residentPermit, hrValidation, zrrValidation, committeeValidation, advisor });

        // Sending a success response after the update
        APIResponse(res, {
            statusCode: 200,
            message: "Candidate updated successfully",
        });

    } catch (error) {
        // Logging the error and sending a generic error response
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while updating candidate" });
    }
}

/**
 * Controller to fetch all candidates.
 * @param {Request} req - The request object for fetching candidates.
 * @param {Response} res - The response object to send data back to the client.
 */
export const getAllCandidates = async (req: Request, res: Response) => {
    try {
        // Fetching all candidates from the service
        const candidates = await candidateService.getAllCandidates();
        // Sending a success response with the list of candidates
        APIResponse(res, {
            statusCode: 200,
            message: "Candidates found",
            data: candidates
        });
    } catch (error) {
        // Logging the error and sending a generic error response
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while fetching candidates" });
    }
}

/**
 * Controller to fetch a candidate by their ID.
 * @param {Request} req - The request object containing the candidate ID.
 * @param {Response} res - The response object to send data back to the client.
 */
export const getCandidateById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // Fetching the candidate by ID
        const candidate = await candidateService.getCandidateById(id);
        if (!candidate) return APIResponse(res, { statusCode: 404, message: "Candidate not found" });

        // Sending a success response with the candidate data
        APIResponse(res, {
            statusCode: 200,
            message: "Candidate found",
            data: candidate
        });

    } catch (error) {
        // Logging the error and sending a generic error response
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while fetching candidate" });
    }
}

/**
 * Controller to fetch candidates by advisor ID.
 * @param {Request} req - The request object containing the advisor ID.
 * @param {Response} res - The response object to send data back to the client.
 */
export const getCandidatesByAdvisor = async (req: Request, res: Response) => {
    try {
        const { advisorId } = req.params;
        // Fetching candidates associated with the advisor
        const candidates = await candidateService.getCandidatesByAdvisor(advisorId);
        if (!candidates) return APIResponse(res, { statusCode: 404, message: "Candidates not found" });

        // Sending a success response with the list of candidates
        APIResponse(res, {
            statusCode: 200,
            message: "Candidates found",
            data: candidates
        });

    } catch (error) {
        // Logging the error and sending a generic error response
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while fetching candidates" });
    }
}

/**
 * Controller to delete a candidate by their ID.
 * @param {Request} req - The request object containing the candidate ID.
 * @param {Response} res - The response object to send data back to the client.
 */
export const deleteCandidate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // Deleting the candidate by ID using the service
        await candidateService.deleteCandidate(id);
        // Sending a success response after deletion
        APIResponse(res, {
            statusCode: 200,
            message: "Candidate deleted successfully",
        });
    } catch (error) {
        // Logging the error and sending a generic error response
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while deleting candidate" });
    }
}