import ImageService from "../services/image-service.js";

class ImageController {
  static async create(req, res, next) {
    try {
      const user = req.user;
      if (!req.files["image"]) {
        res.status(400).json({ errors: "not file send" });
      }
      const imageFile = req.files["image"][0];
      console.log(imageFile);
      const request = {
        userId: req.params.userId,
        title: req.body.title,
        description: req.body.description,
        image: {
          filename: imageFile.filename,
          mimetype: imageFile.mimetype,
          size: imageFile.size,
        },
      };
      await ImageService.create(
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
      const result = await ImageService.listByUserId(userId);
      res.status(200).json({
        statusCode: 200,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  static async getDetailImage(req, res, next) {
    try {
      const request = {
        userId: req.params.userId,
        imageId: req.params.imageId,
      };
      const result = await ImageService.getDetailImage(request);
      res.status(200).json({
        statusCode: 200,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
};

export default ImageController