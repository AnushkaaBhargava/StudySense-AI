import express from "express";
import dotenv from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/ai", aiRoutes);
app.use("/api/pdf",pdfRoutes);

app.listen(3000, () => {
    console.log("Server started on port 3000");
});