import { Request, Response } from "express";
import { APIResponse } from "../../../utils/APIResponse";
import { EstablishmentService } from "../../../domain/services/EstablishmentService";
import { NewEstablishment } from "../../../domain/entities/Establishment";
import { CustomRequest } from "../../../types/custom";

const establishmentService = new EstablishmentService();

export const createEstablishment = async (req: Request, res: Response) => {
    try {
        const { name, siret, address, zipcode, city, telephone } = req.body;
        if (!name.trim() || !siret.trim() || !address.trim() || !zipcode.trim() || !city.trim() || !telephone.trim()) {
            return APIResponse(res, {
                statusCode: 400,
                message: "Invalid establishment details",
            });
        }
        await establishmentService.createEstablishment({ name, siret, address, zipcode, city, telephone });
        
        APIResponse(res, {
            statusCode: 201,
            message: "Establishment created successfully",
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while creating establishment" });
    }
}

export const updateEstablishment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, siret, address, zipcode, city, telephone } = req.body;
        const establishment = await establishmentService.getEstablishmentById(id, { id: true });
        if (!establishment) return APIResponse(res, { statusCode: 404, message: "Establishment not found" });

        await establishmentService.updateEstablishment({ id, name, siret, address, zipcode, city, telephone });

        APIResponse(res, {
            statusCode: 200,
            message: "Establishment updated successfully",
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while updating establishment" });
    }
}

export const getAllEstablishments = async (req: Request, res: Response) => {
    try {
        const establishments = await establishmentService.getAllEstablishments();
        APIResponse(res, {
            statusCode: 200,
            message: "Establishments fetched successfully",
            data: establishments,
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while fetching establishments" });
    }
}

export const getEstablishmentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const establishment = await establishmentService.getEstablishmentById(id, { id: true, name: true, siret: true, address: true, zipcode: true, city: true, telephone: true });
        if (!establishment) return APIResponse(res, { statusCode: 404, message: "Establishment not found" });

        APIResponse(res, {
            statusCode: 200,
            message: "Establishment fetched successfully",
            data: establishment,
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while fetching establishment" });
    }
}

export const getEstablishmentByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        const establishment = await establishmentService.getEstablishmentByName(name, { id: true, name: true, siret: true, address: true, zipcode: true, city: true, telephone: true });
        if (!establishment) return APIResponse(res, { statusCode: 404, message: "Establishment not found" });

        APIResponse(res, {
            statusCode: 200,
            message: "Establishment fetched successfully",
            data: establishment,
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while fetching establishment" });
    }
}

export const deleteEstablishment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const establishment = await establishmentService.getEstablishmentById(id, { id: true });
        if (!establishment) return APIResponse(res, { statusCode: 404, message: "Establishment not found" });

        await establishmentService.deleteEstablishment(id);

        APIResponse(res, {
            statusCode: 200,
            message: "Establishment deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 500, message: "An error occurred while deleting establishment" });
    }
}
