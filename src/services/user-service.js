import { ResponseError } from "../exception/response-error";
import UserModel from "../models/UserModel";
import userValidation from "../validation/user-validation";
import { validation } from "../validation/validation"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import ImageModel from "../models/ImageModel";
import VideoModel from "../models/VideoModel";
import BlogModel from "../models/BlogModel";
dotenv.config();

const register = async (request) => {

    const requestUser = await validation(userValidation.register, request);

    const getUserInDatabase = await UserModel.find({email : requestUser.email})

    if(getUserInDatabase.length != 0) {
        throw new ResponseError(400, 'user already exist')
    }

    requestUser.password = await bcrypt.hash(requestUser.password, 10)
    const user = await UserModel.create({
        email: requestUser.email,
        password: requestUser.password
    })

    return user;
}

const login = async (request) => {
    const userRequest = await validation(userValidation.login, request);
    const user = await UserModel.findOne({email: userRequest.email})
    if(!user) {
        throw new ResponseError(400, 'username or password is wrong')
    }

    const passwordIsValid = await bcrypt.compare(userRequest.password, user.password);

    if(passwordIsValid) {
        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
            title: user.title,
            profileImage: user.profileImage,
            backgroundImage: user.backgroundImage,
            description: user.description
        }
        const expire = 60 * 60 * 1;
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: expire})

        return {
            user: payload,
            token: token
        }
    } else {
        throw new ResponseError(400, 'username or password is wrong')
    }
}

const get = async (email) => {
    const emailRequest = await validation(userValidation.get, email);

    const user = await UserModel.findOne({email: emailRequest});
    if(!user) {
        throw new ResponseError(404, 'user not found')
    }
    const postImage = await ImageModel.find({userId: user.id});
    const postVideo = await VideoModel.find({userId: user.id});
    const postBlog =  await BlogModel.find({userId: user.id});

    return {
            id: user.id,
            email: user.email,
            name: user.name,
            title: user.title,
            profileImage: user.profileImage,
            backgroundImage: user.backgroundImage,
            description: user.description,
            countImage: postImage.length,
            countVideo: postVideo.length,
            countBlog: postBlog.length
    }
}

export default {
    register,
    login,
    get
}