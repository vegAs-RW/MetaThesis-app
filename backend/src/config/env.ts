import { EnvConfig } from "../types/env";

const env: EnvConfig = {
    PORT: parseInt(process.env.PORT || "8000"),
    HOST: process.env.HOST || "localhost",
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:JordanAlex11@localhost:5432/metaThesis",
    JWT_SECRET: process.env.JWT_SECRET || "SuperSecretKey",
    NODE_ENV: process.env.NODE_ENV || "development",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173"
}

export default env;