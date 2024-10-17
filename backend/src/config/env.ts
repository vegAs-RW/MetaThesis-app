import { EnvConfig } from "../types/env";

const env: EnvConfig = {
    PORT: parseInt(process.env.PORT || "8000"),
    HOST: process.env.HOST || "localhost",
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:JordanAlex11@localhost:5432/metaThesis",
    JWT_SECRET: process.env.JWT_SECRET || "SuperSecretKey"
}

export default env;