import { ResponseError } from "../exception/response-error.js";
import UserModel from "../models/UserModel.js";
import userValidation from "../validation/user-validation.js"
import { validation } from "../validation/validation.js"
import bcrypt from 'bcrypt'

const register = async (request) => {
    const requestUser = await validation(userValidation.register, request);

    const getUserInDatabase = await UserModel.find({ email: requestUser.email });

    if (getUserInDatabase.length != 0) {
        throw new ResponseError(400, 'user already exist');
    }

    requestUser.password = await bcrypt.hash(requestUser.password, 10);
    const user = await UserModel.create({
        email: requestUser.email,
        password: requestUser.password
    });

    return user;
}

const login = async (request) => {
    const users = await UserModel.find({ email: request.email });

    if (users.length === 0 ) {
        throw new ResponseError(400, 'Invalid email');
    }

    const user = users[0];

    const isPasswordMatch = await user.comparePassword(request.password);
    
    if (!isPasswordMatch) {
        throw new ResponseError(401, 'Invalid password');
    }
    
    return user
}

export default {
    register,
    login
}