import mongoose from "mongoose";
import { ResponseError } from "../exception/response-error";
import UserModel from "../models/UserModel";
import VideoModel from "../models/VideoModel";
import { validation } from "../validation/validation"
import videoValidation from "../validation/video-validation"
import fs from "fs/promises";

const videoDelete = process.cwd() + '/public/post-video';

const create = async (user, request, protocol, host) => {
    const videoRequest = await validation(videoValidation.create, request,async () => {
        await fs.unlink(videoDelete + "/" + request.video.filename);
    });
    if(user.id != videoRequest.userId) {
        await fs.unlink(videoDelete + "/" + request.video.filename);
        throw new ResponseError(400, 'not create video')
    };
    const userInDatabase = await UserModel.findById(videoRequest.userId);
    if(!userInDatabase) {
        await fs.unlink(videoDelete + "/" + request.video.filename);
        throw new ResponseError(404, 'user not found')
    }

    const data = {
        userId: videoRequest.userId,
        title: videoRequest.title,
        video: protocol +
        "://" +
        host +
        "/public/user/video/" +
        videoRequest.video.filename,
    }

    if(videoRequest.description) {
        data.description = videoRequest.description;
    }

    const video = await VideoModel.create(data)
    return video
}

const listByUserId = async (userId) => {
    const requestUserId = await validation(videoValidation.listByUserId, userId);
    const videos = await VideoModel.find({userId: requestUserId});
    let result = videos
    if(videos.length >= 1) {
        result = videos.map( video => ({
            id: video.id,
            userId: video.userId,
            title: video.title,
            description: video.description,
            video: video.video,
            createdAt: video.createdAt,
            updatedAt: video.updatedAt
        }))
    }
    return result;
}

const getDetailVideo = async (request) => {
    const videoRequest = await validation(videoValidation.getDetailVideo, request);

    if (!mongoose.Types.ObjectId.isValid(videoRequest.videoId)) {
        throw new ResponseError(404, 'image not found');
    }

    const video = await VideoModel.findOne({
        _id: videoRequest.videoId,
        userId: videoRequest.userId
    });

    if(!video) {
        throw new ResponseError(404, 'video not found')
    };

    return video
}

export default {
    create,
    listByUserId,
    getDetailVideo
}