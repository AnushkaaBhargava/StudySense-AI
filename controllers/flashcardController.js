import { extractTextFromPDF } from "../services/pdfService.js";
import { generateFlashcards } from "../services/geminiService.js";

export const createFlashcards=async(req,res)=>{ 

        const text=await extractTextFromPDF(req.file.buffer);
        const flashcards=await generateFlashcards(text);

        res.status(200).json({
           flashcards
        });

    
}