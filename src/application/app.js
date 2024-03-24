import express from "express";
import cors from 'cors';
import { connectDatabase } from "./database.js";
import { apiPublic } from "../routes/api-public.js";
import { errorMiddleware } from "../middlewares/error-middleware.js";
import { api } from "../routes/api.js";

connectDatabase();

export const app = express();
app.use(express.json());
app.use(cors());

app.use(apiPublic);
app.use(api)


app.use(errorMiddleware)

// app.listen(3000, () => {
//     console.log('Listening on port: ', 3000);
// });