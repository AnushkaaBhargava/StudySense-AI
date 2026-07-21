import "./Hero.css";
import { useState } from "react";
import api from "../../services/api";

function Hero({setDocument}){

    const [loading, setLoading] = useState(false);

    async function handleFile(e) {

    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("pdf", file);

    try {

        setLoading(true);

        const response = await api.post(
            "/pdf/upload",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        setDocument(response.data.document);

    } catch (error) {

        console.log(error);

    } finally {

        setLoading(false);

    }

}

    return(

<section className="hero">

<div className="container hero-grid">

<div className="hero-left">

<p className="tag">

AI Powered Learning

</p>

<h1>

Chat with your
<br/>

<span>Study Notes</span>

</h1>

<p className="subtitle">

Upload PDFs, generate summaries,
create flashcards and ask questions
using Retrieval-Augmented Generation.

</p>


<input
    type="file"
    id="pdf-upload"
    accept=".pdf"
    hidden
    onChange={handleFile}
/>

<div className="hero-buttons">

<label
    htmlFor="pdf-upload"
    className="primary-btn"
>
    {loading ? "Uploading..." : "Upload PDF"}
</label>

<button className="secondary">

Live Demo

</button>

</div>


<div className="badges">

<span>📄 PDF Upload</span>

<span>🧠 Flashcards</span>

<span>💬 AI Chat</span>

</div>

</div>



<div className="hero-right">

<div className="dashboard">

<div className="top">

📄 OperatingSystems.pdf

</div>

<div className="tabs">

<span>Summary</span>

<span>Flashcards</span>

<span>Chat</span>

</div>

<div className="summary">

<h4>

AI Summary

</h4>

<ul>

<li>Process manages execution.</li>

<li>Threads share memory.</li>

<li>Deadlock requires 4 conditions.</li>

<li>Paging avoids fragmentation.</li>

</ul>

</div>

<div className="chat-box">

<p>

<b>You</b>

Explain deadlock

</p>

<p>

<b>AI</b>

Deadlock occurs when two or more
processes wait indefinitely...

</p>

</div>

</div>

</div>

</div>

</section>

)

}

export default Hero;