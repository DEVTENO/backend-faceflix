import express from "express"
import userController from "../controllers/user-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

export const api = express.Router();

api.use(authMiddleware)

api.get('/api/users/current', userController.get)