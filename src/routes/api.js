import express from "express"
import userController from "../controllers/user-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { userUpload } from "../application/multer.js";

export const api = express.Router();

api.post('/api/users/profile', userUpload.fields([{name: 'profileImage', maxCount:1}, {name:'backgroundImage', maxCount:1}]), userController.update)

api.use(authMiddleware)
api.get('/api/users/current', userController.get)
