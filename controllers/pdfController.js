import { extractTextFromPDF } from "../services/pdfService.js";
import { askGemini } from "../services/geminiService.js";
import {createChunks} from "../utils/createChunks.js";

export const uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No PDF uploaded",
      });
    }

    const extractedText = await extractTextFromPDF(req.file.buffer);

    const chunks=createChunks(extractedText);
    console.log(chunks);

    const prompt= `
       You are an expert study assistant.

       Summarize the following notes into concise bullet points.

       Notes:
       ${extractedText}
      `;

      const summary=await askGemini(prompt);

    res.status(200).json({
      summary
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};