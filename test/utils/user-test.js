import UserModel from "../../src/models/UserModel"
import bcrypt from 'bcrypt'

const deleteAll = async () => {
    await UserModel.deleteMany({
        email: 'test@gmail.com'
    })
}

const create = async () => {
    const password = await bcrypt.hash('testing', 10)
    await UserModel.create({
        email: 'test@gmail.com',
        password: password
    })
}


export default {
    deleteAll,
    create
}