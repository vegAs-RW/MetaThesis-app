import { Request, Response } from "express";
import { LabDirectorService } from "../../../domain/services/LabDirectorService";
import { LabDirector, NewLabDirector } from "../../../domain/entities/LabDirector";
import { APIResponse } from "../../../utils/APIResponse";
import { CustomRequest } from "../../../types/custom";

const labDirectorService = new LabDirectorService();

export const createLabDirector = async (req: Request, res: Response) => {
    try {
        const { email, firstname, lastname, phoneNumber, hdr, laboratory } = req.body;

        // Validation des données
        if (!email.trim() || !firstname.trim() || !lastname.trim() || !phoneNumber.trim() || !laboratory) {
            return APIResponse(res, {
                statusCode: 400,
                message: "Invalid director details",
            });
        }

        // Préparer les données du directeur
        const newDirector: NewLabDirector = {
            email,
            firstname,
            lastname,
            phoneNumber,
            hdr,
            laboratory, // Assurez-vous que cela correspond à l'ID du laboratoire
        };

        // Créer le directeur
        const createdDirector = await labDirectorService.createLabDirector(newDirector);

        APIResponse(res, {
            statusCode: 201,
            message: "Lab Director created successfully",
            data: createdDirector,
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, {
            statusCode: 500,
            message: "An error occurred while creating Lab Director",
        });
    }
};

export const updateLabDirector = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { email, firstname, lastname, phoneNumber, hdr, laboratory } = req.body;

        // Vérifier si le directeur existe
        const labDirector = await labDirectorService.getLabDirectorById(id, {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            phoneNumber: true,
            hdr: true,
            laboratory: true,
        });
        if (!labDirector) {
            return APIResponse(res, {
                statusCode: 404,
                message: "Lab Director not found",
            });
        }

        // Préparer les données à mettre à jour
        const updatedDirector = {
            id,
            email,
            firstname,
            lastname,
            phoneNumber,
            hdr,
            laboratory,
        };

        // Mettre à jour le directeur
        await labDirectorService.updateLabDirector(updatedDirector);

        APIResponse(res, {
            statusCode: 200,
            message: "Lab Director updated successfully",
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, {
            statusCode: 500,
            message: "An error occurred while updating Lab Director",
        });
    }
};

export const getAllLabDirectors = async (req: Request, res: Response) => {
    try {
        const labDirectors = await labDirectorService.getAllLabDirectors();
        APIResponse(res, {
            statusCode: 200,
            message: "Lab Directors fetched successfully",
            data: labDirectors,
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, {
            statusCode: 500,
            message: "An error occurred while fetching Lab Directors",
        });
    }
};

export const getLabDirectorById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const labDirector = await labDirectorService.getLabDirectorById(id, {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            phoneNumber: true,
            hdr: true,
            laboratory: true
        });
        
        if (!labDirector) {
            return APIResponse(res, {
                statusCode: 404,
                message: "Lab Director not found",
            });
        }

        APIResponse(res, {
            statusCode: 200,
            message: "Lab Director found",
            data: labDirector,
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, {
            statusCode: 500,
            message: "An error occurred while fetching Lab Director",
        });
    }
};

export const getLabDirectorByLaboratory = async (req: Request, res: Response) => {
    try {
        const { labId } = req.params;
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

        APIResponse(res, {
            statusCode: 200,
            message: "Lab Directors found for Laboratory",
            data: director,
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, {
            statusCode: 500,
            message: "An error occurred while fetching Lab Directors",
        });
    }
};