import api from "./api";

export async function listarArquivos() {
    const resposta = await api.get("/files");
    return resposta.data;
}

export async function uploadArquivos(formData, onUploadProgress) {

    const resposta = await api.post("/upload", formData, {
        onUploadProgress
    });

    return resposta.data;
}