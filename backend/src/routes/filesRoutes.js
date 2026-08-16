const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {

    const BASE_URL =
        process.env.BASE_URL ||
        "http://localhost:3001";

    const pastaUploads = path.join(
        __dirname,
        "../../uploads"
    );

    fs.readdir(pastaUploads, (err, arquivos) => {

        if (err) {
            return res.status(500).json({
                sucesso: false,
                erro: err.message
            });
        }

        const lista = arquivos
            .map((nome) => {

                const caminhoArquivo =
                    path.join(
                        pastaUploads,
                        nome
                    );

                const stats =
                    fs.statSync(caminhoArquivo);

                return {
                    nome,
                    tamanho: stats.size,
                    criadoEm: stats.birthtime,
                    url: `${BASE_URL}/uploads/${nome}`
                };
            })
            .sort(
                (a, b) =>
                    new Date(b.criadoEm) -
                    new Date(a.criadoEm)
            );

        res.json(lista);

    });

});

module.exports = router;