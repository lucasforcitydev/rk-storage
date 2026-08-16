import { useState } from "react";
import { Link } from "react-router-dom";

import {
    Typography,
    Button,
    Box,
    Paper,
    LinearProgress,
    Alert,
    Divider
} from "@mui/material";

import Layout from "../components/Layout";
import { uploadArquivos } from "../services/fileService";

export default function Upload() {

    const [files, setFiles] = useState([]);
    const [progresso, setProgresso] = useState(0);
    const [enviando, setEnviando] = useState(false);
    const [sucesso, setSucesso] = useState(false);
    const [quantidadeEnviada, setQuantidadeEnviada] = useState(0);

    function selecionarArquivos(e) {

        setSucesso(false);
        setFiles(Array.from(e.target.files));

    }

    async function enviarArquivos() {

        if (files.length === 0) {
            alert("Selecione pelo menos um arquivo.");
            return;
        }

        const formData = new FormData();

        files.forEach((file) => {
            formData.append("files", file);
        });

        try {

            setEnviando(true);
            setProgresso(0);
            setSucesso(false);

            await uploadArquivos(
                formData,
                (evento) => {

                    const porcentagem = Math.round(
                        (evento.loaded * 100) /
                        evento.total
                    );

                    setProgresso(porcentagem);

                }
            );

            setQuantidadeEnviada(files.length);

            setFiles([]);
            setProgresso(100);
            setSucesso(true);

            document.getElementById(
                "input-files"
            ).value = "";

        } catch (erro) {

            console.error(erro);

            alert(
                "Não foi possível enviar os arquivos. Tente novamente."
            );

        } finally {

            setEnviando(false);

        }

    }

    return (

        <Layout>

            <Paper
                elevation={5}
                sx={{
                    p: 5,
                    borderRadius: 4
                }}
            >

                <Typography
                    variant="h3"
                    align="center"
                    fontWeight="bold"
                >
                    💍
                </Typography>

                <Typography
                    variant="h3"
                    align="center"
                    fontWeight="bold"
                >
                    Karine & Railson
                </Typography>

                <Typography
                    variant="h6"
                    align="center"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                >
                    Casamento
                </Typography>

                <Typography
                    align="center"
                    color="text.secondary"
                >
                    01/08/2026
                </Typography>

                <Divider sx={{ my: 4 }} />

                <Typography
                    align="center"
                    sx={{ mb: 2 }}
                >
                    Compartilhe suas fotos e vídeos.
                </Typography>

                <Typography
                    align="center"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    Seus arquivos serão enviados em sua
                    qualidade original.
                </Typography>

                <input
                    hidden
                    id="input-files"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={selecionarArquivos}
                />

                <Button
                    component="label"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={enviando}
                    sx={{
                        height: 60,
                        mb: 2
                    }}
                >
                    📷 Escolher Fotos e Vídeos

                    <input
                        hidden
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={selecionarArquivos}
                    />
                </Button>

                <Typography align="center">

                    {files.length > 0
                        ? `${files.length} arquivo(s) selecionado(s)`
                        : "Nenhum arquivo selecionado"}

                </Typography>

                <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    size="large"
                    sx={{ mt: 3 }}
                    onClick={enviarArquivos}
                    disabled={enviando}
                >
                    {enviando
                        ? "Enviando..."
                        : "Enviar Arquivos"}
                </Button>

                <Box sx={{ mt: 3 }}>

                    <LinearProgress
                        variant="determinate"
                        value={progresso}
                    />

                </Box>

                <Typography
                    align="center"
                    sx={{ mt: 1 }}
                >
                    {progresso}%
                </Typography>

                {sucesso && (

                    <Alert
                        severity="success"
                        sx={{ mt: 3 }}
                    >
                        Upload realizado com sucesso!
                        <br />
                        {quantidadeEnviada} arquivo(s)
                        enviado(s).
                    </Alert>

                )}

                <Button
                    component={Link}
                    to="/gallery"
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    🖼️ Ver Galeria
                </Button>

            </Paper>

        </Layout>

    );

}