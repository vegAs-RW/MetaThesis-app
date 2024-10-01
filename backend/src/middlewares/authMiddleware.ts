import { Request, Response, NextFunction } from "express";
import { APIResponse } from "../utils/APIResponse";
import jwt from "jsonwebtoken";
import env from "../config/env";
import { CustomRequest } from "../types/custom";

const { JWT_SECRET } = env;

export const isAuth = (req: CustomRequest, res: Response, next: NextFunction) => {

    const {token} = req.cookies;

    if (!token) {
        return APIResponse(res, { statusCode: 401, message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const { userId, name } = decoded as jwt.JwtPayload;

        req.user = {userId, name};

        next();
    } catch (error) {
        console.error(error);
        return APIResponse(res, { statusCode: 401, message: "Unauthorized" });
    }
}