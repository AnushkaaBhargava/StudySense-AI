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

    difficulty: {
    type: String,
    default: ""
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Document", documentSchema);