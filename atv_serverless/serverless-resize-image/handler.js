const serverless = require("serverless-http");
const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const app = express();
const upload = multer({ storage: multer.memoryStorage() }); // Armazenamento em memória para processamento rápido

// Endpoint de teste
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from root!" });
});

app.get("/hello", (req, res) => {
  res.status(200).json({ message: "Hello from path!" });
});

// Novo endpoint para processamento da imagem
app.post("/process-image", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhuma imagem foi enviada." });
  }

  try {
    // Redimensiona e recorta a imagem para 240x240px
    const processedImage = await sharp(req.file.buffer)
      .resize(240, 240)
      .toBuffer();

    res.status(200).json({
      message: "Imagem processada com sucesso!",
      image: processedImage.toString("base64"), // Retorna a imagem como base64
    });
  } catch (error) {
    console.error("Erro ao processar a imagem:", error);
    res.status(500).json({ error: "Erro ao processar a imagem." });
  }
});

// Tratamento de rota não encontrada
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

exports.handler = serverless(app);
