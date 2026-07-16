import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app=express();

const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model=genAI.getGenerativeModel({
    model:"gemini-3.5-flash"
})

app.get("/test",async (req,res)=>{
    try{
        
        const question=req.query.question;
       const result=await model.generateContent(question);
       const response=result.response.text();
       res.send(response);
    }catch(error){

        console.log(error);
        res.status(500).send("Something went wrong");

    }
})
app.get("/",(req,res)=>{
    res.send("StudySense AI Backend is Running 🚀");
})

app.listen(3000,()=>{
    console.log("Server started on port 3000");
});