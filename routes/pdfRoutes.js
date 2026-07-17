import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {uploadPDF} from "../controllers/pdfController.js";
import {createFlashcards} from "../controllers/flashcardController.js";

const router=express.Router();

router.post("/upload",upload.single("pdf"),uploadPDF);

router.post("/flashcards",upload.single("pdf"),createFlashcards);

export default router;