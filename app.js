import express from "express";
import cors from 'cors';
import configs from './configs/config.js';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(configs.PORT, () => {
    console.log('Listening on port: ', configs.PORT);
});