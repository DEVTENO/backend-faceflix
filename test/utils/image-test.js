import ImageModel from "../../src/models/ImageModel"
import UserModel from "../../src/models/UserModel";

class ImageTest {
    static deleteAll = async () => {
        const user = await UserModel.findOne({ email: "test@gmail.com" });
        await ImageModel.deleteMany({
            userId: user.id
        })
    }
    
    static create = async () => {
        const user = await UserModel.findOne({ email: "test@gmail.com" });
        await ImageModel.create({
            userId: user.id,
            title: 'wajib baca',
            description: 'hiihihihih',
            image: 'http//kamu.com/image/apa.png'
        })
    }
    
    static get = async () => {
        const user = await UserModel.findOne({ email: "test@gmail.com" });
        const image = await ImageModel.findOne({userId: user.id});
        return {
            id: image.id
        }
    }
}


export default ImageTest;