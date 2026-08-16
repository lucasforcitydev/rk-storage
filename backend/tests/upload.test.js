const request = require("supertest");
const app = require("../src/server");
const path = require("path");

describe("POST /upload", () => {
    it("deve aceitar uma imagem válida", async () => {
        const arquivo = path.join(
            __dirname,
            "fixtures",
            "imagem.teste.jpg"
        );

        const response = await request(app)
            .post("/upload")
            .attach("files", arquivo);

        expect(response.statusCode).toBe(200);
        expect(response.body.sucesso).toBe(true);
        expect(response.body.arquivos.length).toBe(1);
    });

    it("deve aceitar múltiplos arquivos", async () => {
        const arquivo = path.join(
            __dirname,
            "fixtures",
            "imagem.teste.jpg"
        );

        const response = await request(app)
            .post("/upload")
            .attach("files", arquivo)
            .attach("files", arquivo);

        expect(response.statusCode).toBe(200);
        expect(response.body.sucesso).toBe(true);
        expect(response.body.arquivos.length).toBe(2);
    });

    it("deve rejeitar extensão não permitida", async () => {
        const arquivo = path.join(
            __dirname,
            "fixtures",
            "arquivo.txt"
        );

        const response = await request(app)
            .post("/upload")
            .attach("files", arquivo);

        expect(response.statusCode).toBe(500);
        expect(response.body.sucesso).toBe(false);
    });
});