import { useState } from "react";
import Chat from "../Chat/Chat";
import Flashcards from "../Flashcards/Flashcards";
import StudyInsights from "../StudyInsights/StudyInsights";
import "./Dashboard.css";
import ReactMarkdown from "react-markdown";

function Dashboard({ document }) {

    const [activeTab, setActiveTab] = useState("summary");

    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <h3>{document.fileName}</h3>

            </div>

            <div className="tabs">

                <button
                    className={activeTab === "summary" ? "active" : ""}
                    onClick={() => setActiveTab("summary")}
                >
                    Summary
                </button>

                <button
                    className={activeTab === "flashcards" ? "active" : ""}
                    onClick={() => setActiveTab("flashcards")}
                >
                    Flashcards
                </button>

                <button
                    className={activeTab === "chat" ? "active" : ""}
                    onClick={() => setActiveTab("chat")}
                >
                    AI Chat
                </button>

            </div>

            <div className="dashboard-layout">

                <div className="dashboard-main">

                    {activeTab === "summary" && (
                        <div className="summary-card">
                            <h2>AI Summary</h2>

                            <ReactMarkdown>{document.summary}</ReactMarkdown>
                        </div>
                    )}

                    {activeTab === "flashcards" && (
                        <Flashcards documentId={document._id} />
                    )}

                    {activeTab === "chat" && (
                        <Chat documentId={document._id} />
                    )}

                </div>

                <StudyInsights document={document} />

            </div>

        </div>

    );

}

export default Dashboard;