import UserModel from "../../src/models/UserModel"

const deleteAll = async () => {
    await UserModel.deleteMany({
        email: 'test@gmail.com'
    })
}


export default {
    deleteAll
}