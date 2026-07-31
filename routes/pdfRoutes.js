import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {uploadPDF,getMyDocuments} from "../controllers/pdfController.js";
import {getFlashcards} from "../controllers/flashcardController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router=express.Router();

router.post(
    "/upload",
    authMiddleware,
    upload.single("pdf"),
    uploadPDF
);

router.get("/flashcards/:documentId", getFlashcards);

router.get("/my-documents",authMiddleware,getMyDocuments);

export default router;