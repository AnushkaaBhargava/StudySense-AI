import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true

    },

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
    },
    studyTime: {
    type: Number,
    default: 0,
    },

    pages: {
    type: Number,
    default: 0
     },

     words: {
    type: Number,
    default: 0
     },

   technicalTerms: {
    type: Number,
    default: 0
    },

    avgSentenceLength: {
    type: Number,
    default: 0
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Document", documentSchema);