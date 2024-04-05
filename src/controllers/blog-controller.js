import BlogService from "../services/blog-service.js";

class BlogController {
  static async create(req, res, next) {
    try {
      const user = req.user;
      const request = {
        userId: req.params.userId,
        title: req.body.title,
        text: req.body.text,
      };
  
      await BlogService.create(user, request);
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
      const result = await BlogService.listByUserId(userId);
      res.status(200).json({
        statusCode: 200,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
  
  static async getDetailblog(req, res, next) {
    try {
      const request = {
        userId: req.params.userId,
        blogId: req.params.blogId,
      };
      const result = await BlogService.getDetailblog(request);
      res.status(200).json({
        statusCode: 200,
        data: result,
      });
    } catch (error) {
      next(error);
    }
}

};

export default BlogController;
