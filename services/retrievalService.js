import Chunk from "../models/Chunk.js";
import { generateEmbeddings } from "./embeddingService.js";
import mongoose from "mongoose";

export async function retrieveRelevantChunks(documentId,question){

      console.log("Question in retrieval:", question);

    const queryEmbedding=await generateEmbeddings(question);

    const chunks=await Chunk.aggregate([
        {
            $vectorSearch:{
                index:"default",
                path:"embedding",
                queryVector:queryEmbedding,
                limit:5,
                numCandidates:50,
                filter: {
                documentId: new mongoose.Types.ObjectId(documentId)
                }
            }

    }]);

    return chunks.map(chunk => chunk.text);

}