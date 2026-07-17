import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL,
});

export async function askGemini(prompt) {
    const result = await model.generateContent(prompt);

    const response = result.response.text();

     return response;

}

export async function generateSummary(text) {

    const prompt = `
You are an expert study assistant.

Summarize the following notes into concise bullet points.

Notes:
${text}
`;

    return await askGemini(prompt);
}

export async function generateFlashcards(text) {

    const prompt = `
You are an expert teacher.

Generate 10 flashcards.

Return ONLY valid JSON.

Format:

[
 {
   "question":"",
   "answer":""
 }
]

Notes:

${text}
`;

    return await askGemini(prompt);
}