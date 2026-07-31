import { extractTextFromPDF } from "../services/pdfService.js";
import { askGroq } from "../services/groqService.js";
import {createChunks} from "../utils/createChunks.js";
import Document from "../models/Document.js";
import Chunk from "../models/Chunk.js";
import {generateEmbeddings} from "../services/embeddingService.js";
import { generateFlashcards } from "../services/geminiService.js";
import { getDocument } from "pdfjs-dist";
import axios from "axios";


export const uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No PDF uploaded",
      });
    }
    console.log("1");
    const { text: extractedText, pages } = await extractTextFromPDF(req.file.buffer);

    const words = extractedText
    .trim()
    .split(/\s+/)
    .length;

    const sentences = extractedText
    .split(/[.!?]+/)
    .filter(sentence => sentence.trim() !== "");

    const avgSentenceLength =
    words / Math.max(sentences.length, 1);

    const technicalWords = [

"algorithm",
"database",
"thread",
"process",
"deadlock",
"kernel",
"cache",
"memory",
"sql",
"mongodb",
"react",
"node",
"express",
"binary",
"graph",
"tree",
"hadoop",
"hive",
"spark",
"vector",
"embedding",
"transformer"

];

   const lowerText = extractedText.toLowerCase();

    let technicalTerms = 0;

technicalWords.forEach(word => {

    const matches =
        lowerText.match(
            new RegExp(`\\b${word}\\b`, "g")
        );

    if(matches){

        technicalTerms += matches.length;

    }

});
    
    console.log("2");
    const flashcardsText = await generateFlashcards(extractedText);

         const flashcards = JSON.parse(
               flashcardsText
               .replace(/```json/g, "")
               .replace(/```/g, "")
               .trim()
           );

            console.log("3");
            const prediction = await axios.post(
                "http://127.0.0.1:8000/predict",
            {
              pages,
              words,
              avg_sentence_length: avgSentenceLength,
              technical_terms: technicalTerms
             }
            );

    const difficulty = prediction.data.difficulty;
    const studyTime = prediction.data.study_time;

    const chunks=createChunks(extractedText);

    console.log("Prediction response:", prediction.data);

    console.log("Difficulty:", difficulty);
    console.log("Study Time:", studyTime);
    console.log("Words:",words);
    console.log("Pages:",pages);
    console.log("Avg Sentence Length:",avgSentenceLength);
    console.log("Technical Terms:",technicalTerms);


    const prompt= `
       You are an expert study assistant.

       Summarize the following notes into concise bullet points.

       Notes:
       ${extractedText}
      `;
      
      console.log("4");
      const summary=await askGroq(prompt);
        
        console.log("5");
       await Promise.all(
       chunks.map(async (chunk) => {
          chunk.embedding = await generateEmbeddings(chunk.text);
           })
         );

      console.log("6");
      const document= await Document.create({
        userId:req.user.id,
        fileName:req.file.originalname,
        summary,
        flashcards,
        difficulty,
        studyTime,
        pages,
        words,
        technicalTerms,
        avgSentenceLength
      });

      console.log("7");
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

export async function getMyDocuments(req,res){

  try{
     const documents=await Document.find({
     userId:req.user.id
     })
    .select("fileName createdAt")
    .sort({createdAt:-1});

    res.json(documents);

  }catch(error){

    console.log(error);

      res.status(500).json({

            message:"Server Error"

      });

  }
}