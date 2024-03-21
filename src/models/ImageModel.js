import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    image: String,
    title: String,
    description: String,
}, {
    timestamps: true
});

const ImageModel = mongoose.model('Image', imageSchema);

export default ImageModel;