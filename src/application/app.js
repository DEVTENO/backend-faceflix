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

app.use('/public/user/profile', express.static('./public/user-profile/profile/'));
app.use('/public/user/background/', express.static('./public/user-profile/background'));

app.use(apiPublic);
app.use(api)


app.use(errorMiddleware)

app.listen(3000, () => {
    console.log('Listening on port: ', 3000);
    // console.log(path.join(__dirname, './public/user-profile/profile'));
    // console.log(process.cwd())
});