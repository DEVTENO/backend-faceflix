import multer from "multer";
import path from "path";
import { ResponseError } from "../exception/response-error.js";

const profileImage = process.cwd() + '/public/user-profile/profile'
const backgroundImage = process.cwd() + '/public/user-profile/background'


const usersProfileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "profileImage") {
      cb(null, profileImage);
    } else if (file.fieldname === "backgroundImage") {
      cb(null, backgroundImage);
    }
  },
  filename: function (req, file, cb) {
    if (file.fieldname === "profileImage") {
      cb(null, "profile-" + Date.now() + path.extname(file.originalname));
    } else if (file.fieldname === "backgroundImage") {
      cb(null, "background-" + Date.now() + path.extname(file.originalname));
    }
  },
});

const userProfileFilter = (req, file, cb) => {
    if (file.fieldname === 'profileImage' || file.fieldname === 'backgroundImage') {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
      } else {
        cb(new ResponseError(400,'Only JPEG/PNG images are allowed'));
      }
    } else {
      cb(null, true);
    }
  };

const userUpload = multer({
  storage: usersProfileStorage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: userProfileFilter,
});

export { userUpload };
