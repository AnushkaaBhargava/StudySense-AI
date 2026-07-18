import { extractTextFromPDF } from "../services/pdfService.js";
import { askGemini } from "../services/geminiService.js";
import {createChunks} from "../utils/createChunks.js";
import Document from "../models/Document.js";
import Chunk from "../models/Chunk.js";
import {generateEmbeddings} from "../services/embeddingService.js";

export const uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No PDF uploaded",
      });
    }

    const extractedText = await extractTextFromPDF(req.file.buffer);

    const chunks=createChunks(extractedText);

    const prompt= `
       You are an expert study assistant.

       Summarize the following notes into concise bullet points.

       Notes:
       ${extractedText}
      `;

      const summary=await askGemini(prompt);
       
       await Promise.all(
       chunks.map(async (chunk) => {
          chunk.embedding = await generateEmbeddings(chunk.text);
           })
         );

      const document= await Document.create({
        fileName:req.file.originalname,
        summary
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