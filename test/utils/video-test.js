import UserModel from "../../src/models/UserModel";
import VideoModel from "../../src/models/VideoModel";

class VideoTest {
    static deleteAll = async () => {
        const user = await UserModel.findOne({ email: "test@gmail.com" });
        await VideoModel.deleteMany({
            userId: user.id
        })
    }
    
    static create = async () => {
        const user = await UserModel.findOne({ email: "test@gmail.com" });
        await VideoModel.create({
            userId: user.id,
            title: 'video lucu',
            description: 'iya ini sangat lucu',
            video: 'http://dunialucu.com/video/hihiho.mp4'
        })
    }
    
    static get = async () => {
        const user = await UserModel.findOne({ email: "test@gmail.com" });
        const video = await VideoModel.findOne({userId: user.id})
    
        return {
            id: video.id
        }
    }
}

export default VideoTest;