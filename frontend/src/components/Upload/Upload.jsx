import "./Upload.css";

function Upload(){

    return(
        <section className="upload-section">

            <div className="upload-box">

                <div className="upload-icon">
                    📄
                </div>

                <h2>
                    Upload your study material
                </h2>

                <p>
                    Drop your PDF notes here and let AI
                    create summaries, flashcards and answers.
                </p>


                <input 
                    type="file"
                    accept="application/pdf"
                    id="pdf-upload"
                />


                <label htmlFor="pdf-upload">
                    Choose PDF
                </label>


            </div>

        </section>
    )
}

export default Upload;