# RK Storage

Sistema web para compartilhamento de fotos e vídeos em eventos.

## Sobre o projeto

O RK Storage foi desenvolvido para permitir que convidados de um evento enviem fotos e vídeos diretamente pelo celular para uma galeria compartilhada.

O sistema foi desenvolvido pensando em um evento real, com múltiplos usuários enviando arquivos simultaneamente e mantendo os arquivos em sua qualidade original.

## Funcionalidades

- Upload de fotos e vídeos
- Upload de múltiplos arquivos
- Galeria compartilhada
- Visualização de fotos e vídeos
- Atualização automática da galeria
- Suporte para dispositivos móveis
- Armazenamento dos arquivos no servidor
- Download dos arquivos
- API REST para gerenciamento dos arquivos

## Tecnologias

### Frontend

- React
- Vite
- Axios
- JavaScript

### Backend

- Node.js
- Express
- Multer
- REST API

### Infraestrutura

- Linux
- Ubuntu
- Nginx
- VPS
- PM2

## Estrutura do projeto

```text
rk-storage/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
│
└── documentacao/


  #API

Listar arquivos
GET /files

Retorna os arquivos disponíveis na galeria.

Enviar arquivos
POST /upload

Permite o envio de fotos e vídeos para o servidor.

Tipos de arquivos aceitos
- JPG
- JPEG
- PNG
- WEBP
- HEIC
- MP4
- MOV
- AVI
- MKV
- WEBM


  # Objetivo

O projeto também foi utilizado como oportunidade prática para trabalhar conceitos de desenvolvimento web, APIs REST, upload de arquivos, deploy em VPS, configuração de Nginx e posteriormente testes automatizados.

Status

Projeto funcional e hospedado em VPS para utilização em evento real.

Autor

Lucas Santos

Desenvolvedor em formação com foco em desenvolvimento web e qualidade de software.