import { retrieveRelevantChunks } from "./retrievalService.js";
import { askGemini } from "./geminiService.js";

export async function answerQuestion(documentId,question){
    const chunks=await retrieveRelevantChunks(
        documentId,
        question
    );

    console.log("Retrieved chunks:", chunks);

    const context=chunks.join("\n\n");

     const prompt = `
          You are an AI study assistant.

        Answer the question using ONLY the context below.

        Context:
       ${context}


        Question:
       ${question}


      If the answer is not present in the context,
     say "I could not find this information in the document."
         `;

     return await askGemini(prompt);
};