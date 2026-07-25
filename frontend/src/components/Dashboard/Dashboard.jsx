import { useState } from "react";
import Chat from "../Chat/Chat";
import Flashcards from "../Flashcards/Flashcards";
import StudyInsights from "../StudyInsights/StudyInsights";
import "./Dashboard.css";

function Dashboard({ document }) {

    const [activeTab, setActiveTab] = useState("summary");

    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <h1>{document.fileName}</h1>

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
                        <>
                            <h2>AI Summary</h2>

                            <p>{document.summary}</p>
                        </>
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