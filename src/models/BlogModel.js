import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    title: String,
    text: String
}, {
    timestamps: true
});

const BlogModel = mongoose.model('Blog', blogSchema);

export default BlogModel;