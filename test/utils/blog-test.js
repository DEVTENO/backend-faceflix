import BlogModel from "../../src/models/BlogModel";
import UserModel from "../../src/models/UserModel";

class BlogTest {
    static deleteAll = async () => {
        const user = await UserModel.findOne({ email: "test@gmail.com" });
        await BlogModel.deleteMany({userId: user.id})
    }
    
    static create = async () => {
        const user = await UserModel.findOne({ email: "test@gmail.com" });
        await BlogModel.create({
            userId: user.id,
            title: 'test blog',
            text: 'test text'
        })
    }
    
    static get = async () => {
        const user = await UserModel.findOne({ email: "test@gmail.com" });
        const blog = await BlogModel.findOne({userId: user.id});
        return {
            id: blog.id
        }
    }
}

export default BlogTest;