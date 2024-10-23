import express from "express";
import cors from "cors";
import crypto from "crypto";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(cors());

const port = 5002;

app.get("/", (req, res) => {
	res.send("Welcome to the Server Secret");
});

app.post("/generate-word", (req, res) => {
    const { secret } = req.body;
    console.log(`Secret received: ${secret}`)
    const randomIndex = parseInt(secret, 16);

    fs.readFile('./sherek.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return;
        }

        const lines = data.split('\n').filter(line => line.trim() !== '');

        const lineIndex = randomIndex % lines.length;
        res.send({body: {
            word: lines[lineIndex].trim(),
            num: randomIndex,
        }});
    });
})

app.listen(port, () => {
	console.log(`Server Secret running in port ${port}`);
});
