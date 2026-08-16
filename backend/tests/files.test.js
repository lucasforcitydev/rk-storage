const request = require("supertest");
const app = require("../src/server");

describe("GET /files", () => {
    it("deve retornar status 200", async () => {
        const response = await request(app).get("/files");

        expect(response.statusCode).toBe(200);
    });

    it("deve retornar uma lista de arquivos", async () => {
        const response = await request(app).get("/files");

        expect(Array.isArray(response.body)).toBe(true);
    });
});