import { askGemini } from "../services/geminiService.js";

export async function askQuestion(req, res) {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                message: "Question is required."
            });
        }

        const answer = await askGemini(question);

        res.status(200).json({
            answer
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong."
        });
    }
}