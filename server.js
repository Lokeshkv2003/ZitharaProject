const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { OpenAI } = require("openai");

require("dotenv").config(); // Load .env variables

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/suggest", async (req, res) => {
  const { name, age, occasion, interests } = req.body;

  const prompt = `Suggest a thoughtful gift for ${name}, a ${age}-year-old, for the occasion "${occasion}". Interests include: ${interests}. Give a brief explanation too.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    const suggestion = response.choices[0].message.content;
    res.json({ suggestion });
  } catch (err) {
    console.error("Error from OpenAI:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to get suggestion." });
  }
});

app.listen(5000, () => console.log("✅😊Server running on http://localhost:5000"));
