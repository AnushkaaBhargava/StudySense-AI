import { answerQuestion } from "../services/chatService.js";

export async function chat(req,res){

    try{

        const {documentId,question}=req.body;

        const answer=await answerQuestion(
            documentId,
            question
        );

        res.json({
            answer
        });


    }catch(error){


        console.log(error);

        res.status(500).json({
            message:error.message
        });

    }

}