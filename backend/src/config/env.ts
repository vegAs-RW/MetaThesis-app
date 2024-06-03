import { EnvConfig } from "../types/env";

const env: EnvConfig = {
    PORT: parseInt(process.env.PORT || "8000"),
    HOST: process.env.HOST || "localhost"
}

export default env;