import {GoogleGenAI} from "@google/genai"
import dotenv from "dotenv";

dotenv.config();

const ai=new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
});

export async function generateEmbeddings(text){

      console.log("Embedding received:", text);

    const response = await ai.models.embedContent({
    model: "gemini-embedding-2",
    contents: text,
});

 return response.embeddings[0].values;

}
