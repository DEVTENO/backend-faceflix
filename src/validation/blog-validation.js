import Joi from "joi";

class BlogValidation {
  static create = Joi.object({
    userId: Joi.string().required(),
    title: Joi.string().min(1).max(50).required(),
    text: Joi.string().min(1).required(),
  });
  
  static listByUserId = Joi.string().required();
  
  static getDetailblog = Joi.object({
    userId: Joi.string().required(),
    blogId: Joi.string().required(),
  });
}


export default BlogValidation;
