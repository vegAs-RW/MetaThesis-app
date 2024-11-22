import dotenv from "dotenv"
dotenv.config();

import express, {Request, Response, NextFunction} from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import router from "./infrastructure/web/routes";

import cors from "cors";

import env from "./config/env";



const {PORT, HOST, FRONTEND_URL, NODE_ENV} = env

const app = express();

const isProduction = NODE_ENV === 'production';

app.use(cors({
    origin: isProduction ? FRONTEND_URL : 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(helmet())



app.get('/', (req: Request, res: Response) => {
    res.send('Hello world here')
})

app.get('/test', (req: Request, res: Response) => {
    res.send('Hello world here')
}   
)

app.use(router);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})