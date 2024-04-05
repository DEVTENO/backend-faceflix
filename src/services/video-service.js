import mongoose from "mongoose";
import fs from "fs/promises";

// Exception
import { ResponseError } from "../exception/response-error.js";

// Model
import UserModel from "../models/UserModel.js";
import VideoModel from "../models/VideoModel.js";

// Validation
import { validation } from "../validation/validation.js";
import VideoValidation from "../validation/video-validation.js";

class VideoService {
 static #videoDelete = process.cwd() + "/public/post-video";


  static async  create(user, request, protocol, host) {
    const videoRequest = await validation(
      VideoValidation.create,
      request,
      async () => {
        await fs.unlink(VideoService.#videoDelete + "/" + request.video.filename);
      }
    );
    if (user.id != videoRequest.userId) {
      await fs.unlink(VideoService.#videoDelete + "/" + request.video.filename);
      throw new ResponseError(400, "not create video");
    }
    const userInDatabase = await UserModel.findById(videoRequest.userId);
    if (!userInDatabase) {
      await fs.unlink(VideoService.#videoDelete + "/" + request.video.filename);
      throw new ResponseError(404, "user not found");
    }
  
    const data = {
      userId: videoRequest.userId,
      title: videoRequest.title,
      video:
        protocol +
        "://" +
        host +
        "/public/user/video/" +
        videoRequest.video.filename,
    };
  
    if (videoRequest.description) {
      data.description = videoRequest.description;
    }
  
    await VideoModel.create(data);
  };
  
  static async listByUserId(userId) {
    const requestUserId = await validation(VideoValidation.listByUserId, userId);
    const videos = await VideoModel.find({ userId: requestUserId });
    let result = videos;
    if (videos.length >= 1) {
      result = videos.map((video) => ({
        id: video.id,
        userId: video.userId,
        title: video.title,
        description: video.description,
        video: video.video,
        createdAt: video.createdAt,
        updatedAt: video.updatedAt,
      }));
    }
    return result;
  };
  
  static async getDetailVideo(request) {
    const videoRequest = await validation(
      VideoValidation.getDetailVideo,
      request
    );
  
    if (!mongoose.Types.ObjectId.isValid(videoRequest.videoId)) {
      throw new ResponseError(404, "image not found");
    }
  
    const video = await VideoModel.findOne({
      _id: videoRequest.videoId,
      userId: videoRequest.userId,
    });
  
    if (!video) {
      throw new ResponseError(404, "video not found");
    }
  
    return {
      id: video.id,
      userId: video.userId,
      title: video.title,
      description: video.description,
      video: video.video,
      createdAt: video.createdAt,
      updatedAt: video.updatedAt
    }
  };
}


export default VideoService;