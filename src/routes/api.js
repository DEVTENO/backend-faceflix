import express from "express";

// Middleware
import { authMiddleware } from "../middlewares/auth-middleware.js";

// Multer
import { imageUpload, videoUpload } from "../application/multer.js";

// Controller
import UserController from "../controllers/user-controller.js";
import ImageController from "../controllers/image-controller.js";
import VideoController from "../controllers/video-controller.js";
import BlogController from "../controllers/blog-controller.js";

export const api = express.Router();

api.use(authMiddleware);

api.get("/api/users/current", UserController.get);
api.patch(
  "/api/users/current/profile",
  imageUpload.upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "backgroundImage", maxCount: 1 },
  ]),
  UserController.update
);

// Image Api
api.post(
  "/api/users/:userId/image",
  imageUpload.upload.fields([{ name: "image", maxCount: 1 }]),
  ImageController.create
);
api.get("/api/users/:userId/image", ImageController.listByUserId);
api.get("/api/users/:userId/image/:imageId", ImageController.getDetailImage);

// Video Api
api.post(
  "/api/users/:userId/video",
  videoUpload.upload.fields([{ name: "video", maxCount: 1 }]),
  VideoController.create
);
api.get("/api/users/:userId/video", VideoController.listByUserId);
api.get("/api/users/:userId/video/:videoId", VideoController.getDetailVideo);

// Blog Api
api.post("/api/users/:userId/blog", BlogController.create);
api.get("/api/users/:userId/blog", BlogController.listByUserId);
api.get("/api/users/:userId/blog/:blogId", BlogController.getDetailblog);
