# StudySense AI

StudySense AI is an AI-powered study assistant that transforms PDF study notes into interactive learning resources. Upload a PDF to generate structured summaries, AI-powered flashcards, personalized study insights, and ask questions using Retrieval-Augmented Generation (RAG).

---

## Features

- 📄 Upload PDF study notes
- 📝 AI-generated structured summaries
- 🧠 Interactive AI flashcards for quick revision
- 💬 Context-aware AI Chat powered by Retrieval-Augmented Generation (RAG)
- 📊 Automatic Study Insights:
  - Difficulty Level
  - Estimated Study Time
  - Total Pages
  - Word Count
  - Technical Terms
  - Average Sentence Length
- 🔍 Semantic search using vector embeddings
- 🎨 Clean and responsive user interface

---

## Tech Stack

### Frontend
- React.js
- CSS3
- Axios
- React Markdown

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### AI & Machine Learning
- Google Gemini API
- Groq API (Llama 3.1)
- MongoDB Atlas Vector Search
- Retrieval-Augmented Generation (RAG)

### PDF Processing
- pdfjs-dist

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-github-username/StudySense-AI.git

cd StudySense-AI
```

### 2. Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the backend folder:

```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
```

Start the backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## How It Works

1. Upload a PDF document.
2. Text is extracted from the PDF.
3. The extracted text is divided into smaller chunks.
4. Vector embeddings are generated for each chunk.
5. Chunks are stored in MongoDB Atlas Vector Search.
6. Gemini generates a structured summary.
7. Groq generates AI flashcards.
8. Study insights are generated from the uploaded PDF.
9. During chat, the most relevant chunks are retrieved using semantic search and passed to the LLM to generate context-aware answers.

---

## Screenshots

### Home Page

The landing page where users can upload study notes and explore the application's AI-powered features.

![Home Page](backend/screenshots/studysense_home.png)

---

### AI Summary

A structured AI-generated summary highlighting the most important concepts from the uploaded PDF.

![AI Summary](backend/screenshots/summary.png)

---

### AI Flashcards

Interactive flashcards generated automatically to help users revise important concepts.

![AI Flashcards](backend/screenshots/flashcard.png)

---

### AI Chat

Ask questions about the uploaded document and receive accurate, context-aware responses powered by RAG.

![AI Chat](backend/screenshots/AI_chat.png)

---

## 📂 Project Structure

```text
StudySense-AI
│
├── backend
│   ├── controllers
│   ├── ml
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── screenshots
│   ├── studysense_home.png
│   ├── summary.png
│   ├── flashcard.png
│   └── AI_chat.png
│
└── README.md
```

---

## Study Insights

For every uploaded PDF, StudySense AI automatically analyses the document and estimates:

- 📈 Difficulty Level
- ⏱️ Estimated Study Time
- 📄 Number of Pages
- 📝 Total Words
- 💡 Technical Terms
- 📚 Average Sentence Length

These insights help users understand the complexity of the study material before they begin learning.

---

## Future Improvements

- User Authentication
- Quiz Generation
- Progress Tracking Dashboard
- Multi-document Chat
- PDF Library
- OCR Support for Scanned PDFs
- Chat History
- Export Flashcards
- Dark Mode

---

## Author

**Anushkaa Bhargava**

---
