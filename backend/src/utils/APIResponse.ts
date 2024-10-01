import { Response } from "express";

export interface IError {
    field?: string;
    message: string;
}

interface Inormalized {
    statusCode: number;
    message: string;
    data?: string[] | object | null | IError[];
}

export const response = (res: Response, normalized: Inormalized): Response => {
    res.setHeader("X-powered-By", "MetaThesis");
    return res.status(normalized.statusCode).json(
        {
            message: normalized.message,
            data: normalized.data
        }
    );
}