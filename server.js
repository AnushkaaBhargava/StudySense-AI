import express from "express";
import dotenv from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";
import { connectDB } from "./config/db.js";
import chatRoutes from "./routes/chatRoutes.js";
import cors from "cors"

dotenv.config();

await connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/ai", aiRoutes);
app.use("/api/pdf",pdfRoutes);
app.use("/api/chat", chatRoutes);

app.listen(3000, () => {
    console.log("Server started on port 3000");
});