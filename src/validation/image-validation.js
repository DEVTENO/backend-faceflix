import Joi from "joi";

class ImageValidation{
  static create = Joi.object({
    userId: Joi.string().required(),
    title: Joi.string().min(1).max(50).required(),
    description: Joi.string().optional(),
    image: Joi.object({
      filename: Joi.string().required(),
      mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
      size: Joi.number()
        .max(2 * 1024 * 1024)
        .required(),
    }),
  });
  
  static listByUserId = Joi.string().required();
  
  static getDetailImage = Joi.object({
    userId: Joi.string().required(),
    imageId: Joi.string().required(),
  });
}


export default ImageValidation;
