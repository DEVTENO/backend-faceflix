import mongoose from "mongoose";
import configs from "../../configs/config.js";

export async function connectDatabase() {
    try {
        await mongoose.connect(configs.DATABASEURL)
        console.log("Database connect");
    } catch (error) {
        console.log("Error connect", error.message);
        process.exit(1)
    }
}