import { encodeBase64 } from "bcryptjs";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        name: String,
        title: String,
        profileImage: String,
        backgroundImage: String,
        description: String
    }
)

const UserModel = mongoose.model('User', userSchema);

export default UserModel;