import express from "express";
import cors from 'cors';
import { connectDatabase } from "./database.js";
import { apiPublic } from "../routes/api-public.js";
import { errorMiddleware } from "../middlewares/error-middleware.js";
import { api } from "../routes/api.js";

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);
const profileImg =  path.resolve(__dirname, '../../public/uploads/profile');
const backgroundImg =  path.resolve(__dirname, '../../public/uploads/profile');


connectDatabase();
export const app = express();

app.use(express.json());
app.use(cors());

app.use('/public/uploads/profile/',express.static(profileImg));
app.use('/public/uploads/background/',express.static(backgroundImg));
app.use(apiPublic);
app.use(api)


app.use(errorMiddleware)

app.listen(3000, () => {
    console.log('Listening on port: ', 3000);
});