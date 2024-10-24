import { Request, Response } from "express";
import { LaboratoryService } from "../../../domain/services/LaboratoryService";
import { NewLabDirector } from "../../../domain/entities/LabDirector";
import { NewLaboratory } from "../../../domain/entities/Laboratory";
import { APIResponse } from "../../../utils/APIResponse";
import { CustomRequest } from "../../../types/custom";

const laboratoryService = new LaboratoryService();

/**
 * Controller to create a new laboratory with a director.
 * @param {Request} req - Contains the laboratory and director details to be created.
 * @param {Response} res - Response sent back to the client.
 */
export const createLaboratoryWithDirector = async (req: Request, res: Response) => {
    try {
        // Extracting data from the request body
        const { name, address, city, country, means, expertise, directorEmail, directorFirstname, directorLastname, directorPhoneNumber, directorHdr } = req.body;
        // Validating laboratory details
        if (!name.trim() || !address.trim() || !city.trim() || !country.trim() || !means.trim() || !expertise.trim()) {
            return APIResponse(res, {
                statusCode: 400,
                message: "Invalid laboratory details",
            });
        }
        // Validating director details
        if (!directorEmail.trim() || !directorFirstname.trim() || !directorLastname.trim() || !directorPhoneNumber.trim()) {
            return APIResponse(res, {
                statusCode: 400,
                message: "Invalid director details",
            });
        }
       // Prepare the new laboratory and director data
        const newLaboratory: NewLaboratory = { name, address, city, country, means, expertise };
        const newLabDirector: NewLabDirector = { email: directorEmail, firstname: directorFirstname, lastname: directorLastname, phoneNumber: directorPhoneNumber, hdr: directorHdr, laboratory: "" };
        // Create the laboratory and director
        const createdLaboratory = await laboratoryService.createLaboratory(newLaboratory, newLabDirector);
        
        // If creation failed
        if (!createdLaboratory) {
            return APIResponse(res, {
                statusCode: 500,
                message: "Failed to create laboratory and director",
            });
        }
        // Success response after creating laboratory and director
        APIResponse(res, {
            statusCode: 201,
            message: "Laboratory and director created successfully",
            data: {
                laboratory: createdLaboratory,
                director: {
                    email: directorEmail,
                    firstname: directorFirstname,
                    lastname: directorLastname,
                    phoneNumber: directorPhoneNumber,
                    hdr: directorHdr,
                    laboratory: createdLaboratory.id
                }
            }
        });
    } catch (error) {
        // Error handling and logging
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while creating laboratory" });
    }
}

/**
 * Controller to update an existing laboratory.
 * @param {Request} req - Contains the laboratory ID and data to update.
 * @param {Response} res - Response sent back to the client.
 */
export const updateLaboratory = async (req: Request, res: Response) => {   
    try {
        const { id } = req.params;
        const { name, address, city, country, means, expertise } = req.body;
        // Check if the laboratory exists
        const laboratory = await laboratoryService.getLaboratoryById(id, { id: true });
        if (!laboratory) return APIResponse(res, { statusCode: 404, message: "Laboratory not found" });

        // Update the laboratory's information
        await laboratoryService.updateLaboratory({ id, name, address, city, country, means, expertise });

        // Success response after updating
        APIResponse(res, {
            statusCode: 200,
            message: "Laboratory updated successfully",
        });
    } catch (error) {
        // Error handling and logging
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while updating laboratory" });
    }
}

/**
 * Controller to retrieve all laboratories.
 * @param {Request} req - The request to fetch laboratories.
 * @param {Response} res - The response containing the list of laboratories.
 */
export const getAllLaboratories = async (req: Request, res: Response) => {
    try {
        // Fetch all laboratories
        const laboratories = await laboratoryService.getAllLaboratories();
        // Success response with the list of laboratories
        APIResponse(res, {
            statusCode: 200,
            message: "Laboratories fetched successfully",
            data: laboratories,
        });
    } catch (error) {
         // Error handling and logging
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while fetching laboratories" });
    }
}

/**
 * Controller to retrieve a laboratory by its ID.
 * @param {Request} req - Contains the laboratory ID in the parameters.
 * @param {Response} res - Response containing the laboratory's details.
 */
export const getLaboratoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // Fetch a laboratory by its ID
        const laboratory = await laboratoryService.getLaboratoryById(id, { id: true, name: true, address: true, city: true, country: true, means: true, expertise: true });
        if (!laboratory) return APIResponse(res, { statusCode: 404, message: "Laboratory not found" });

         // Success response with the laboratory's details
        APIResponse(res, {
            statusCode: 200,
            message: "Laboratory found",
            data: laboratory
        });
    } catch (error) {
        // Error handling and logging
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while fetching laboratory" });
    }
}

/**
 * Controller to retrieve a laboratory by its name.
 * @param {Request} req - Contains the laboratory name in the parameters.
 * @param {Response} res - Response containing the laboratory's details.
 */
export const getLaboratoryByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        // Fetch a laboratory by its name
        const laboratory = await laboratoryService.getLaboratoryByName(name, { id: true, name: true, address: true, city: true, country: true, means: true, expertise: true });
        if (!laboratory) return APIResponse(res, { statusCode: 404, message: "Laboratory not found" });

        // Success response with the laboratory's details
        APIResponse(res, {
            statusCode: 200,
            message: "Laboratory found",
            data: laboratory
        });
    } catch (error) {
        // Error handling and logging
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while fetching laboratory" });
    }
}

/**
 * Controller to retrieve laboratories by city.
 * @param {Request} req - Contains the city in the parameters.
 * @param {Response} res - Response containing the list of laboratories in that city.
 */
export const getLaboratoryByCity = async (req: Request, res: Response) => {
    try {
        const { city } = req.params;
        const laboratory = await laboratoryService.getLaboratoryByCity(city, { id: true, name: true, address: true, city: true, country: true, means: true, expertise: true });
        if (!laboratory) return APIResponse(res, { statusCode: 404, message: "Laboratory not found" });

        APIResponse(res, {
            statusCode: 200,
            message: "Laboratory found",
            data: laboratory
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while fetching laboratory" });
    }
}

/**
 * Controller to retrieve laboratories by country.
 * @param {Request} req - Contains the country in the parameters.
 * @param {Response} res - Response containing the list of laboratories in that country.
 */
export const getLaboratoryByCountry = async (req: Request, res: Response) => {
    try {
        const { country } = req.params;
        const laboratory = await laboratoryService.getLaboratoryByCountry(country, { id: true, name: true, address: true, city: true, country: true, means: true, expertise: true });
        if (!laboratory) return APIResponse(res, { statusCode: 404, message: "Laboratory not found" });

        APIResponse(res, {
            statusCode: 200,
            message: "Laboratory found",
            data: laboratory
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while fetching laboratory" });
    }
}