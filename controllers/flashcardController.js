import Document from "../models/Document.js";

export const getFlashcards = async (req, res) => {

    const document = await Document.findById(req.params.documentId);

    res.status(200).json({
        flashcards: document.flashcards,
    });

};