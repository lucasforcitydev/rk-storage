const express = require("express");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", upload.array("files"), (req, res) => {

    res.json({
        sucesso: true,
        arquivos: req.files
    });

});

module.exports = router;