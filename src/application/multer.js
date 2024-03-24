import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);
const profileImage = path.resolve(__dirname, "../../public/uploads/profile");
const backgroundImage = path.resolve(__dirname, "../../public/uploads/background");


const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    if (file.fieldname === "profileImage") {
      cb(null, profileImage);
    } else if (file.fieldname === "backgroundImage") {
      cb(null, backgroundImage);
    }
  },
  filename: function (req, file, cb) {
    // Memberi nama file dengan tanggal unik + ekstensi file asli
    console.log(file);
    if (file.fieldname === "profileImage") {
        cb(null, "profile-" + Date.now() + path.extname(file.originalname));
      } else if (file.fieldname === "backgroundImage") {
        cb(null, "background-" + Date.now() + path.extname(file.originalname));
      }
  },
});
const userUpload = multer({ storage: profileStorage });

export { userUpload };
