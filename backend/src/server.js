const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const filesRoutes = require("./routes/filesRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "../uploads")
    )
);

app.use("/upload", uploadRoutes);
app.use("/files", filesRoutes);

app.use((err, req, res, next) => {

    console.error(err);

    return res.status(500).json({
        sucesso: false,
        mensagem:
            err.message ||
            "Ocorreu um erro interno no servidor."
    });

});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {

    console.log(
        `Servidor rodando na porta ${PORT}`
    );

});