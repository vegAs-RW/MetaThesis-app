import { Request, Response } from "express";
import { APIResponse } from "../../../utils/APIResponse";
import { EstablishmentService } from "../../../domain/services/EstablishmentService";


const establishmentService = new EstablishmentService();

/**
 * Controller to handle the creation of a new establishment.
 * @param {Request} req - The request object containing the establishment's details.
 * @param {Response} res - The response object to send data back to the client.
 */
export const createEstablishment = async (req: Request, res: Response) => {
    try {
        // Destructuring necessary fields from the request body
        const { name, siret, address, zipcode, city, telephone } = req.body;
        // Input validation: Checking if all fields are filled and properly trimmed
        if (!name.trim() || !siret.trim() || !address.trim() || !zipcode.trim() || !city.trim() || !telephone.trim()) {
            return APIResponse(res, {
                statusCode: 400,
                message: "Invalid establishment details",
            });
        }
        // Creating a new establishment using the service
        await establishmentService.createEstablishment({ name, siret, address, zipcode, city, telephone });

        // Sending a success response after the creation
        APIResponse(res, {
            statusCode: 201,
            message: "Establishment created successfully",
        });
    } catch (error) {
        // Logging the error and sending a generic error response
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while creating establishment" });
    }
}

/**
 * Controller to handle the update of an existing establishment.
 * @param {Request} req - The request object containing the establishment's updated details.
 * @param {Response} res - The response object to send data back to the client.
 */
export const updateEstablishment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, siret, address, zipcode, city, telephone } = req.body;
        // Fetching the establishment by ID to ensure it exists
        const establishment = await establishmentService.getEstablishmentById(id, { id: true });
        if (!establishment) return APIResponse(res, { statusCode: 404, message: "Establishment not found" });
        // Updating the establishment's information
        await establishmentService.updateEstablishment({ id, name, siret, address, zipcode, city, telephone });

        // Sending a success response after the update
        APIResponse(res, {
            statusCode: 200,
            message: "Establishment updated successfully",
        });
    } catch (error) {
        // Logging the error and sending a generic error response
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while updating establishment" });
    }
}

/**
 * Controller to fetch all establishments.
 * @param {Request} req - The request object for fetching establishments.
 * @param {Response} res - The response object to send data back to the client.
 */
export const getAllEstablishments = async (req: Request, res: Response) => {
    try {
        // Fetching all establishments from the service
        const establishments = await establishmentService.getAllEstablishments();
        // Sending a success response with the list of establishments
        APIResponse(res, {
            statusCode: 200,
            message: "Establishments fetched successfully",
            data: establishments,
        });
    } catch (error) {
        // Logging the error and sending a generic error response
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while fetching establishments" });
    }
}

/**
 * Controller to fetch an establishment by its ID.
 * @param {Request} req - The request object containing the establishment ID.
 * @param {Response} res - The response object to send data back to the client.
 */
export const getEstablishmentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // Fetching the establishment by ID
        const establishment = await establishmentService.getEstablishmentById(id, { id: true, name: true, siret: true, address: true, zipcode: true, city: true, telephone: true });
        if (!establishment) return APIResponse(res, { statusCode: 404, message: "Establishment not found" });

        // Sending a success response with the establishment data
        APIResponse(res, {
            statusCode: 200,
            message: "Establishment fetched successfully",
            data: establishment,
        });
    } catch (error) {
        // Logging the error and sending a generic error response
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while fetching establishment" });
    }
}

/**
 * Controller to fetch an establishment by its name.
 * @param {Request} req - The request object containing the establishment name.
 * @param {Response} res - The response object to send data back to the client.
 */
export const getEstablishmentByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        // Fetching the establishment by name
        const establishment = await establishmentService.getEstablishmentByName(name, { id: true, name: true, siret: true, address: true, zipcode: true, city: true, telephone: true });
        if (!establishment) return APIResponse(res, { statusCode: 404, message: "Establishment not found" });

        // Sending a success response with the establishment data
        APIResponse(res, {
            statusCode: 200,
            message: "Establishment fetched successfully",
            data: establishment,
        });
    } catch (error) {
        // Logging the error and sending a generic error response
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while fetching establishment" });
    }
}

/**
 * Controller to delete an establishment by its ID.
 * @param {Request} req - The request object containing the establishment ID.
 * @param {Response} res - The response object to send data back to the client.
 */
export const deleteEstablishment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // Fetching the establishment by ID to ensure it exists
        const establishment = await establishmentService.getEstablishmentById(id, { id: true });
        if (!establishment) return APIResponse(res, { statusCode: 404, message: "Establishment not found" });

        // Deleting the establishment
        await establishmentService.deleteEstablishment(id);

        // Sending a success response after deletion
        APIResponse(res, {
            statusCode: 200,
            message: "Establishment deleted successfully",
        });
    } catch (error) {
        // Logging the error and sending a generic error response
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while deleting establishment" });
    }
}
