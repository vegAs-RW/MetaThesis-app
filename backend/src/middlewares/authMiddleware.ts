import { Request, Response, NextFunction } from "express";
import { APIResponse } from "../utils/APIResponse";
import jwt from "jsonwebtoken";
import env from "../config/env";
import { CustomRequest } from "../types/custom";

const { JWT_SECRET } = env;

export const isAuth = (req: CustomRequest, res: Response, next: NextFunction) => {
    // Récupérer le token depuis l'en-tête Authorization
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return APIResponse(res, { statusCode: 401, message: "Unauthorized" });
    }

    // Vérifier si le format du token est 'Bearer token_value'
    const token = authHeader.split(' ')[1]; // On prend la deuxième partie après 'Bearer'

    if (!token) {
        return APIResponse(res, { statusCode: 401, message: "Unauthorized" });
    }

    try {
        // Vérification du token
        const decoded = jwt.verify(token, JWT_SECRET);
        const { userId, name } = decoded as jwt.JwtPayload;

        // Ajout des données de l'utilisateur dans la requête
        req.user = { userId, name };

        next();
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 401, message: "Unauthorized" });
    }
}
