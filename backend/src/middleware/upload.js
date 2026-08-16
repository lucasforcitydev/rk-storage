const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const pastaUploads = path.join(
    __dirname,
    "../../uploads"
);

if (!fs.existsSync(pastaUploads)) {
    fs.mkdirSync(pastaUploads, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, pastaUploads);
    },

    filename: (req, file, cb) => {

        const extensao = path.extname(file.originalname);

        const nome =
            Date.now() +
            "-" +
            crypto.randomUUID() +
            extensao;

        cb(null, nome);
    }
});

const fileFilter = (req, file, cb) => {

    const tiposPermitidos =
        /\.(jpg|jpeg|png|webp|heic|mp4|mov|avi|mkv|webm)$/i;

    if (tiposPermitidos.test(file.originalname)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Formato não permitido. Envie apenas imagens ou vídeos."
            )
        );
    }
};

module.exports = multer({
    storage,
    fileFilter
});