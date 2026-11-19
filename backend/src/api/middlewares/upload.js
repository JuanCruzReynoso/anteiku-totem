import multer from "multer";
import path from "node:path";
import { __dirname } from "../utils/index.js";

const storage = multer.diskStorage({
    destination: path.join(__dirname, "src/public/uploads/products"),
    filename: (req, file, cb) => {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, unique + path.extname(file.originalname));
    }
});

// solo imagenes de hasta 2MB
export default multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const tipos = ["image/jpeg", "image/png", "image/webp"];
        cb(null, tipos.includes(file.mimetype));
    }
});
