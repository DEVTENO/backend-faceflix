import express from "express"
import userController from "../controllers/user-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const api = express.Router();

api.post('/api/users/profile', upload.fields([{name: 'profileImage', maxCount:1}, {name:'backgroundImage', maxCount:1}]), userController.update)

api.use(authMiddleware)
api.get('/api/users/current', userController.get)
