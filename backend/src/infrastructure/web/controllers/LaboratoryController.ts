import { Request, Response } from "express";
import { LaboratoryService } from "../../../domain/services/LaboratoryService";
import { NewLabDirector } from "../../../domain/entities/LabDirector";
import { NewLaboratory } from "../../../domain/entities/Laboratory";
import { APIResponse } from "../../../utils/APIResponse";
import { CustomRequest } from "../../../types/custom";

const laboratoryService = new LaboratoryService();

export const createLaboratoryWithDirector = async (req: Request, res: Response) => {
    try {
        const { name, address, city, country, means, expertise, directorEmail, directorFirstname, directorLastname, directorPhoneNumber, directorHdr } = req.body;
        if (!name.trim() || !address.trim() || !city.trim() || !country.trim() || !means.trim() || !expertise.trim()) {
            return APIResponse(res, {
                statusCode: 400,
                message: "Invalid laboratory details",
            });
        }

        if (!directorEmail.trim() || !directorFirstname.trim() || !directorLastname.trim() || !directorPhoneNumber.trim()) {
            return APIResponse(res, {
                statusCode: 400,
                message: "Invalid director details",
            });
        }
       
        const newLaboratory: NewLaboratory = { name, address, city, country, means, expertise };
        const newLabDirector: NewLabDirector = { email: directorEmail, firstname: directorFirstname, lastname: directorLastname, phoneNumber: directorPhoneNumber, hdr: directorHdr, laboratory: "" };
        const createdLaboratory = await laboratoryService.createLaboratory(newLaboratory, newLabDirector);
        
        if (!createdLaboratory) {
            return APIResponse(res, {
                statusCode: 500,
                message: "Failed to create laboratory and director",
            });
        }
        APIResponse(res, {
            statusCode: 201,
            message: "Laboratory and director created successfully",
            data: {
                laboratory: createdLaboratory,
            }
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while creating laboratory" });
    }
}

export const updateLaboratory = async (req: Request, res: Response) => {   
    try {
        const { id } = req.params;
        const { name, address, city, country, means, expertise } = req.body;
        const laboratory = await laboratoryService.getLaboratoryById(id, { id: true });
        if (!laboratory) return APIResponse(res, { statusCode: 404, message: "Laboratory not found" });

        await laboratoryService.updateLaboratory({ id, name, address, city, country, means, expertise });

        APIResponse(res, {
            statusCode: 200,
            message: "Laboratory updated successfully",
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while updating laboratory" });
    }
}

export const getAllLaboratories = async (req: Request, res: Response) => {
    try {
        const laboratories = await laboratoryService.getAllLaboratories();
        APIResponse(res, {
            statusCode: 200,
            message: "Laboratories fetched successfully",
            data: laboratories,
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while fetching laboratories" });
    }
}

export const getLaboratoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const laboratory = await laboratoryService.getLaboratoryById(id, { id: true, name: true, address: true, city: true, country: true, means: true, expertise: true });
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

export const getLaboratoryByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        const laboratory = await laboratoryService.getLaboratoryByName(name, { id: true, name: true, address: true, city: true, country: true, means: true, expertise: true });
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