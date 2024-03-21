import { ResponseError } from "../exception/response-error";
import UserModel from "../models/UserModel";
import userValidation from "../validation/user-validation"
import { validation } from "../validation/validation"
import bcrypt from 'bcrypt'

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

export default {
    register
}