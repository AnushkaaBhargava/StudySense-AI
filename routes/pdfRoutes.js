import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {uploadPDF} from "../controllers/pdfController.js";
import {getFlashcards} from "../controllers/flashcardController.js";

const router=express.Router();

router.post("/upload",upload.single("pdf"),uploadPDF);

router.get("/flashcards/:documentId", getFlashcards);

export default router;