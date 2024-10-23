import express from "express";
import cors from "cors";
import crypto from "crypto";

const app = express();
app.use(express.json());
app.use(cors());

const port = 5001;

app.get("/", (req, res) => {
	res.send("Welcome to the Server Secret");
});

app.get("/generate-secret", (req, res) => {
    const secret = crypto.randomBytes(32).toString('hex').slice(0, 32);
    console.log(`Generated Secret: ${secret} - At (${new Date()})`)
    const word = async (secret) => await fetch("http://localhost:5002/generate_word",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        body: {secret: secret}
    })
    res.send(secret);
})

app.listen(port, () => {
	console.log(`Server Secret running in port ${port}`);
});
