import dotenv from "dotenv"
dotenv.config();

import express, {Request, Response, NextFunction} from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import cors from "cors"

import env from "./config/env"


const {PORT, HOST} = env

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(helmet())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world here')
})

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})