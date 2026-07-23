import { extractTextFromPDF } from "../services/pdfService.js";
import { askGroq } from "../services/groqService.js";
import {createChunks} from "../utils/createChunks.js";
import Document from "../models/Document.js";
import Chunk from "../models/Chunk.js";
import {generateEmbeddings} from "../services/embeddingService.js";
import { generateFlashcards } from "../services/geminiService.js";


export const uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No PDF uploaded",
      });
    }

    const extractedText = await extractTextFromPDF(req.file.buffer);

    const flashcardsText = await generateFlashcards(extractedText);

         const flashcards = JSON.parse(
               flashcardsText
               .replace(/```json/g, "")
               .replace(/```/g, "")
               .trim()
           );

    const chunks=createChunks(extractedText);

    const prompt= `
       You are an expert study assistant.

       Summarize the following notes into concise bullet points.

       Notes:
       ${extractedText}
      `;

      const summary=await askGroq(prompt);
       
       await Promise.all(
       chunks.map(async (chunk) => {
          chunk.embedding = await generateEmbeddings(chunk.text);
           })
         );

      const document= await Document.create({
        fileName:req.file.originalname,
        summary,
        flashcards
      });

      await Promise.all(
        chunks.map((chunk) =>
          Chunk.create({
            documentId: document._id,
            chunkId: chunk.chunkId,
            text: chunk.text,
            embedding: chunk.embedding,
            })
           )
         );

    res.status(200).json({

    message:"Document uploaded successfully",

    document
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};