import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    video: String,
    title: String,
    description: String,
}, {
    timestamps: true
});

const VideoModel = mongoose.model('Video', videoSchema);

export default VideoModel;