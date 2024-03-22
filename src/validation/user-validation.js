import Joi from"joi";

const register = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const login =  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const get = Joi.string().email().required()


export default {
    register,
    login,
    get
}