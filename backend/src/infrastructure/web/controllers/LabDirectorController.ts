import { Request, Response } from "express";
import { LabDirectorService } from "../../../domain/services/LabDirectorService";
import { LabDirector, NewLabDirector } from "../../../domain/entities/LabDirector";
import { APIResponse } from "../../../utils/APIResponse";
import { CustomRequest } from "../../../types/custom";

const labDirectorService = new LabDirectorService();

/**
 * Controller to create a new lab director.
 * @param {Request} req - Contains the details of the director to be created.
 * @param {Response} res - Response sent back to the client.
 */
export const createLabDirector = async (req: Request, res: Response) => {
    try {
        // Extracting data from the request body
        const { email, firstname, lastname, phoneNumber, hdr, laboratory } = req.body;

        // Validating input data
        if (!email.trim() || !firstname.trim() || !lastname.trim() || !phoneNumber.trim() || !laboratory) {
            return APIResponse(res, {
                statusCode: 400,
                message: "Invalid director details",
            });
        }

        // Prepare the new director's data
        const newDirector: NewLabDirector = {
            email,
            firstname,
            lastname,
            phoneNumber,
            hdr,
            laboratory: laboratory.id,
        };

        // Create the director in the database
        const createdDirector = await labDirectorService.createLabDirector(newDirector);

        // Success response after creation
        APIResponse(res, {
            statusCode: 201,
            message: "Lab Director created successfully",
            data: createdDirector,
        });
    } catch (error) {
        // Error handling and logging
        console.error(error);
        return APIResponse(res, {
            statusCode: 500,
            message: "An error occurred while creating Lab Director",
        });
    }
};

/**
 * Controller to update an existing lab director.
 * @param {Request} req - Contains the director ID and the data to update.
 * @param {Response} res - Response sent back to the client.
 */
export const updateLabDirector = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { email, firstname, lastname, phoneNumber, hdr, laboratory } = req.body;

        // Check if the director exists
        const labDirector = await labDirectorService.getLabDirectorById(id, {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            phoneNumber: true,
            hdr: true,
            laboratory: true,
        });
        // Error if director doesn't exist
        if (!labDirector) {
            return APIResponse(res, {
                statusCode: 404,
                message: "Lab Director not found",
            });
        }

        // Prepare updated data for the director
        const updatedDirector = {
            id,
            email,
            firstname,
            lastname,
            phoneNumber,
            hdr,
            laboratory,
        };

        // Update the director's information
        await labDirectorService.updateLabDirector(updatedDirector);

        // Success response after updating
        APIResponse(res, {
            statusCode: 200,
            message: "Lab Director updated successfully",
        });
    } catch (error) {
        // Error handling and logging
        console.error(error);
        return APIResponse(res, {
            statusCode: 500,
            message: "An error occurred while updating Lab Director",
        });
    }
};

/**
 * Controller to retrieve all lab directors.
 * @param {Request} req - The request to fetch directors.
 * @param {Response} res - The response containing the list of directors.
 */
export const getAllLabDirectors = async (req: Request, res: Response) => {
    try {
        // Fetch all lab directors
        const labDirectors = await labDirectorService.getAllLabDirectors();
        // Success response with the list of directors
        APIResponse(res, {
            statusCode: 200,
            message: "Lab Directors fetched successfully",
            data: labDirectors,
        });
    } catch (error) {
        // Error handling and logging
        console.error(error);
        return APIResponse(res, {
            statusCode: 500,
            message: "An error occurred while fetching Lab Directors",
        });
    }
};

/**
 * Controller to retrieve a lab director by their ID.
 * @param {Request} req - Contains the director ID in the parameters.
 * @param {Response} res - Response containing the director's details.
 */
export const getLabDirectorById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // Fetch a director by their ID
        const labDirector = await labDirectorService.getLabDirectorById(id, {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            phoneNumber: true,
            hdr: true,
            laboratory: true
        });
        // Error if the director is not found
        if (!labDirector) {
            return APIResponse(res, {
                statusCode: 404,
                message: "Lab Director not found",
            });
        }

        // Success response with the director's details
        APIResponse(res, {
            statusCode: 200,
            message: "Lab Director found",
            data: labDirector,
        });
    } catch (error) {
        // Error handling and logging
        console.error(error);
        return APIResponse(res, {
            statusCode: 500,
            message: "An error occurred while fetching Lab Director",
        });
    }
};

/**
 * Controller to retrieve a lab director by their laboratory ID.
 * @param {Request} req - Contains the laboratory ID in the parameters.
 * @param {Response} res - Response containing the directors associated with the laboratory.
 */
export const getLabDirectorByLaboratory = async (req: Request, res: Response) => {
    try {
        const { labId } = req.params;
        // Fetch a director by their laboratory ID
        const director = await labDirectorService.getLabDirectorByLaboratory(labId, {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            phoneNumber: true,
            hdr: true,
            laboratory: true
        });

        if (director) {
            return APIResponse(res, {
                statusCode: 404,
                message: "No Lab Directors found for this Laboratory",
            });
        }
        // Success response with the details of the director found
        APIResponse(res, {
            statusCode: 200,
            message: "Lab Directors found for Laboratory",
            data: director,
        });
    } catch (error) {
        // Error handling and logging
        console.error(error);
        return APIResponse(res, {
            statusCode: 500,
            message: "An error occurred while fetching Lab Directors",
        });
    }
};