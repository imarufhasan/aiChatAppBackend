// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// app.post("/chat", async (req, res) => {
//   const { message } = req.body;

//   try {
//     const response = await fetch("https://api.openai.com/v1/responses", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "gpt-4.1-mini",
//         input: message,
//       }),
//     });

//     const data = await response.json();

//     console.log("OPENAI RESPONSE:", JSON.stringify(data, null, 2));

//     const reply =
//       data?.output?.[0]?.content?.[0]?.text ||
//       data?.output_text ||
//       "No response from AI";

//     res.json({ reply });

//   } catch (err) {
//     console.log("ERROR:", err);
//     res.status(500).json({ error: "AI error" });
//   }
// });

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: message },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("GEMINI RESPONSE:", JSON.stringify(data, null, 2));

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini";

    res.json({ reply });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Gemini AI error" });
  }
});

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "AI Chat Backend is running",
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
  console.log("AI Chat Backend is ready!");
});