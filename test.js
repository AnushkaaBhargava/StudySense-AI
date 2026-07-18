import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { retrieveRelevantChunks } from "./services/retrievalService.js";
import mongoose from "mongoose";

dotenv.config();

await connectDB();

const documentId = "6a5b4d116f9b6104db15f073";

const result = await retrieveRelevantChunks(
    documentId,
    "Explain Deadlock"
);

console.log(result);