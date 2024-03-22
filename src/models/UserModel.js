import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../configs/config.js';

const userSchema = mongoose.Schema(
    {
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

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function() {
    return jwt.sign({ _id: this._id }, config.JWTSECRET);
}

const UserModel = mongoose.model('User', userSchema);

export default UserModel;