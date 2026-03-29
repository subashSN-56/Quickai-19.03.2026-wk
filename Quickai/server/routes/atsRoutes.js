
import express from "express";
import multer from "multer";
import pdf from "pdf-parse";
import Groq from "groq-sdk";
import 'dotenv/config';

import { calculateATSScore } from "../utils/atsScore.js";

const router = express.Router();
const upload = multer(); // memory storage

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// 🔥 MAIN API
router.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 📄 Extract PDF text
    const data = await pdf(req.file.buffer);
    const resumeText = data.text;

    // ✅ Real score
    const score = calculateATSScore(resumeText);

    // 🤖 AI Suggestions
const prompt = `
You are an advanced ATS (Applicant Tracking System).

Analyze the resume carefully.

Return ONLY JSON:

{
  "missing_keywords": ["at least 5 relevant technical skills missing"],
  "suggestions": ["at least 5 improvements for resume"]
}

Rules:
- Always give minimum 5 missing keywords
- Always give minimum 5 suggestions
- Suggestions must be practical and useful
- Keywords must be relevant to software developer roles

Resume:
${resumeText}
`;

   const response = await groq.chat.completions.create({
  model: "llama-3.1-8b-instant", // ✅ FIXED
  messages: [{ role: "user", content: prompt }],
  temperature: 0.3,
});

    let aiResult = response.choices[0].message.content;

    try {
      aiResult = JSON.parse(aiResult);
    } catch {
      aiResult = { missing_keywords: [], suggestions: [] };
    }

    res.json({
      score,
      ...aiResult,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "ATS analysis failed" });
  }
});

export default router;