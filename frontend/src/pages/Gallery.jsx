import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    Box,
    Typography,
    Paper,
    Tabs,
    Tab,
    Card,
    CardMedia,
    Button,
    CircularProgress,
    Dialog,
    IconButton
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Layout from "../components/Layout";
import { listarArquivos } from "../services/fileService";

export default function Gallery() {
    const [arquivos, setArquivos] = useState([]);
    const [aba, setAba] = useState(0);
    const [carregando, setCarregando] = useState(true);

    const [arquivoSelecionado, setArquivoSelecionado] =
        useState(null);

    useEffect(() => {
        carregarArquivos();

        const intervalo = setInterval(() => {
            carregarArquivos();
        }, 5000);

        return () => clearInterval(intervalo);
    }, []);

    async function carregarArquivos() {
        try {
            const arquivosRecebidos =
                await listarArquivos();

            setArquivos(arquivosRecebidos);
        } catch (erro) {
            console.error(erro);
        } finally {
            setCarregando(false);
        }
    }

    const fotos = arquivos.filter((arquivo) =>
        arquivo.nome.match(
            /\.(jpg|jpeg|png|webp|heic)$/i
        )
    );

    const videos = arquivos.filter((arquivo) =>
        arquivo.nome.match(
            /\.(mp4|mov|avi|mkv|webm)$/i
        )
    );

    return (
        <Layout>
            <Button
                component={Link}
                to="/"
                startIcon={<ArrowBackIcon />}
                sx={{ mb: 3 }}
            >
                Voltar
            </Button>

            <Typography
                variant="h4"
                align="center"
                fontWeight="bold"
                gutterBottom
            >
                Galeria
            </Typography>

            <Typography
                align="center"
                color="text.secondary"
                sx={{ mb: 3 }}
            >
                Toque em uma foto ou vídeo para visualizar.
                <br />
                Utilize as opções do seu celular para
                salvar ou compartilhar.
            </Typography>

            <Typography
                align="center"
                color="text.secondary"
            >
                Fotos: {fotos.length}
            </Typography>

            <Typography
                align="center"
                color="text.secondary"
            >
                Vídeos: {videos.length}
            </Typography>

            <Typography
                align="center"
                color="text.secondary"
                sx={{ mb: 3 }}
            >
                Total: {arquivos.length}
            </Typography>

            {carregando && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        my: 5
                    }}
                >
                    <CircularProgress />
                </Box>
            )}

            {!carregando && (
                <>
                    <Paper sx={{ mb: 3 }}>
                        <Tabs
                            value={aba}
                            onChange={(e, novoValor) =>
                                setAba(novoValor)
                            }
                            centered
                        >
                            <Tab
                                label={`Fotos (${fotos.length})`}
                            />
                            <Tab
                                label={`Vídeos (${videos.length})`}
                            />
                        </Tabs>
                    </Paper>

                    {(aba === 0
                        ? fotos
                        : videos).length === 0 && (
                        <Typography
                            align="center"
                            color="text.secondary"
                            sx={{ mt: 5 }}
                        >
                            Nenhum arquivo enviado ainda.
                        </Typography>
                    )}

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fill,minmax(220px,1fr))",
                            gap: 2
                        }}
                    >
                        {(aba === 0
                            ? fotos
                            : videos).map(
                            (arquivo) => (
                                <Card
                                    key={arquivo.nome}
                                >
                                    {aba === 0 ? (
                                        <CardMedia
                                            component="img"
                                            image={
                                                arquivo.url
                                            }
                                            alt={
                                                arquivo.nome
                                            }
                                            onClick={() =>
                                                setArquivoSelecionado(
                                                    arquivo
                                                )
                                            }
                                            sx={{
                                                height: 220,
                                                objectFit:
                                                    "cover",
                                                cursor:
                                                    "pointer"
                                            }}
                                        />
                                    ) : (
                                        <CardMedia
                                            component="video"
                                            src={
                                                arquivo.url
                                            }
                                            onClick={() =>
                                                setArquivoSelecionado(
                                                    arquivo
                                                )
                                            }
                                            sx={{
                                                height: 220,
                                                cursor:
                                                    "pointer"
                                            }}
                                        />
                                    )}
                                </Card>
                            )
                        )}
                    </Box>

                    <Dialog
                        open={
                            !!arquivoSelecionado
                        }
                        onClose={() =>
                            setArquivoSelecionado(
                                null
                            )
                        }
                        maxWidth="lg"
                        fullWidth
                    >
                        <Box
                            sx={{
                                position:
                                    "relative",
                                bgcolor:
                                    "black",
                                p: 1
                            }}
                        >
                            <IconButton
                                onClick={() =>
                                    setArquivoSelecionado(
                                        null
                                    )
                                }
                                sx={{
                                    position:
                                        "absolute",
                                    right: 10,
                                    top: 10,
                                    color:
                                        "white",
                                    zIndex: 1
                                }}
                            >
                                <CloseIcon />
                            </IconButton>

                            {arquivoSelecionado &&
                            arquivoSelecionado.nome.match(
                                /\.(jpg|jpeg|png|webp|heic)$/i
                            ) ? (
                                <img
                                    src={
                                        arquivoSelecionado.url
                                    }
                                    alt={
                                        arquivoSelecionado.nome
                                    }
                                    style={{
                                        width:
                                            "100%",
                                        maxHeight:
                                            "90vh",
                                        objectFit:
                                            "contain"
                                    }}
                                />
                            ) : (
                                <video
                                    src={
                                        arquivoSelecionado?.url
                                    }
                                    controls
                                    autoPlay
                                    style={{
                                        width:
                                            "100%",
                                        maxHeight:
                                            "90vh"
                                    }}
                                />
                            )}
                        </Box>
                    </Dialog>
                </>
            )}
        </Layout>
    );
}