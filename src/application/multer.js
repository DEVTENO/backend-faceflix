import multer from "multer";
import path from "path";
import { ResponseError } from "../exception/response-error.js";

class FileUpload {
  constructor(limits, destinations, filters) {
    this.storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, destinations[file.fieldname]);
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      },
    });
    this.fileFilter= function (req, file, cb) {
      if (filters.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new ResponseError(400, "File type not supported"));
      }
    }
    this.upload = multer({
      storage: this.storage,
      limits: limits,
      fileFilter: this.fileFilter
    });
  }
}

const destinations = {
  profileImage: process.cwd() + "/public/user-profile/profile",
  backgroundImage: process.cwd() + "/public/user-profile/background",
  image: process.cwd() + "/public/post-image",
  video: process.cwd() + "/public/post-video",
};

const filters = {
  image: ["image/jpeg", "image/png"],
  video: ["video/mp4", "video/x-matroska", "video/x-matroska-3d"]
};

const imageUpload = new FileUpload({ fileSize: 2 * 1024 * 1024 }, destinations, filters.image);
const videoUpload = new FileUpload({ fileSize: 5 * 1024 * 1024 }, destinations, filters.video);

export { videoUpload, imageUpload };
