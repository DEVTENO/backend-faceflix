import mongoose from "mongoose";

// Exception
import { ResponseError } from "../exception/response-error.js";

// Model
import BlogModel from "../models/BlogModel.js";
import UserModel from "../models/UserModel.js";

// Validation
import BlogValidation from "../validation/blog-validation.js";
import { validation } from "../validation/validation.js";

class BlogService {
  static async  create(user, request) {
    const blogRequest = await validation(BlogValidation.create, request);
    if (user.id != blogRequest.userId) {
      throw new ResponseError(400, "cannot create blog");
    }
  
    const userInDatabase = await UserModel.findById(blogRequest.userId);
  
    if (!userInDatabase) {
      throw new ResponseError(404, "user not found");
    }
    const data = {
      userId: blogRequest.userId,
      title: blogRequest.title,
      text: blogRequest.text,
    };
    await BlogModel.create(data);
  };
  
  static async listByUserId(userId) {
    const requestUserId = await validation(BlogValidation.listByUserId, userId);
  
    const blogs = await BlogModel.find({ userId: requestUserId });
    let result = blogs;
    if (blogs.length >= 1) {
      result = blogs.map((blog) => ({
        id: blog.id,
        userId: blog.userId,
        title: blog.title,
        text: blog.text,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      }));
    }
    return result;
  };
  
  static async getDetailblog(request) {
    const blogRequest = await validation(BlogValidation.getDetailblog, request);
    if (!mongoose.Types.ObjectId.isValid(blogRequest.blogId)) {
      throw new ResponseError(404, "blog not found");
    }
    const blog = await BlogModel.findOne({
      _id: blogRequest.blogId,
      userId: blogRequest.userId,
    });
  
    if (!blog) {
      throw new ResponseError(404, "blog not found");
    }
  
    return {
      id: blog.id,
      userId: blog.userId,
      title: blog.title,
      text: blog.text,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    };
  };
}


export default BlogService;
