import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      default: "",
    },
     flashcards: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Document", documentSchema);