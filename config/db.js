import mongoose from "mongoose";
import dotenv from "dotenv";

export async function connectDB(){
    try{

        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected");

    }catch(error){
      console.error("❌ MongoDB Connection Failed");

      console.error(error.message);

      process.exit(1);
    }
}