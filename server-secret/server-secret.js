import express from "express";
import cors from "cors";
import crypto from "crypto";
import fetch from "node-fetch"; // Certifique-se de que o pacote node-fetch está instalado

const app = express();
app.use(express.json());
app.use(cors());

const port = 5001;

app.get("/", (req, res) => {
	res.send("Welcome to the Server Secret");
});

app.get("/generate-secret", async (req, res) => {
    const secret = crypto.randomBytes(32).toString('hex').slice(0, 32);
    console.log(`Generated Secret: ${secret} - At (${new Date()})`);

    try {
        const response = await fetch("http://localhost:5002/generate-word", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ secret: secret }) // Corrigindo o envio do body
        });

        const data = await response.json(); // Certifique-se de que a resposta seja convertida em JSON
        const temp = { word: data.body.word, num: data.body.num, secret: secret };

        res.send(JSON.stringify(temp));
    } catch (error) {
        console.error("Error while fetching from server-generate:", error);
        res.status(500).send({ error: "Failed to fetch data from server-generate" });
    }
});

app.listen(port, () => {
	console.log(`Server Secret running in port ${port}`);
});
