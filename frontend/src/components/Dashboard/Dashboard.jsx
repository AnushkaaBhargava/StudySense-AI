import { useState } from "react";
import Chat from "../Chat/Chat";
import Flashcards from "../Flashcards/Flashcards";
import "./Dashboard.css";

function Dashboard({ document }) {

    const [activeTab, setActiveTab] = useState("summary");

    return (

        <div className="dashboard">

            <h1>{document.fileName}</h1>

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

            <div className="dashboard-content">

                {activeTab === "summary" && (
                    <>
                        <h2>Summary</h2>
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

        </div>

    );

}

export default Dashboard;