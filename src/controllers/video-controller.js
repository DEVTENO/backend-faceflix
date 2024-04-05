import VideoService from "../services/video-service.js";

class VideoController {
  static async create (req, res, next) {
    try {
      const user = req.user;
      if (!req.files["video"]) {
        res.status(400).json({
          errors: "video not send",
        });
      }
      const videoFile = req.files["video"][0];
      console.warn(req.files);
      const request = {
        userId: req.params.userId,
        title: req.body.title,
        description: req.body.description,
        video: {
          filename: videoFile.filename,
          mimetype: videoFile.mimetype,
          size: videoFile.size,
        },
      };
      await VideoService.create(
        user,
        request,
        req.protocol,
        req.host
      );
      res.status(201).json({
        statusCode: 201,
        data: 'OK',
      });
    } catch (error) {
      next(error);
    }
  };
  
  static async listByUserId(req, res, next) {
    try {
      const userId = req.params.userId;
      const result = await VideoService.listByUserId(userId);
      res.status(200).json({
        statusCode: 200,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
  
  static async getDetailVideo(req, res, next) {
    try {
      const request = {
        userId: req.params.userId,
        videoId: req.params.videoId,
      };
  
      const result = await VideoService.getDetailVideo(request);
      res.status(200).json({
        statusCode: 200,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default VideoController;