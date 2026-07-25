import "./StudyInsights.css";

function StudyInsights({ document }) {

     const difficultyColor = {
        Beginner: "#22c55e",
        Intermediate: "#f59e0b",
        Advanced: "#ef4444"
    };

    return (
        <div className="study-card">
             <h2>📊 Study Insights</h2>
             <div className="study-grid">
                <div className="item">
                    <span>Difficulty</span>

                      <strong
                        style={{
                            color:
                            difficultyColor[
                                document.difficulty
                            ]
                        }}
                    >
                        {document.difficulty}
                    </strong>

                </div>
                <div className="item">
                    <span>Study Time</span>
                    <strong> {document.studyTime} mins</strong>
                </div>

                <div className="item">
                     <span>Pages</span>
                    <strong> {document.pages}</strong>
                </div>

                <div className="item">
                     <span>Words</span>
                    <strong> {document.words}</strong>
                </div>

                 <div className="item">
                    <span>Technical Terms</span>
                    <strong>{document.technicalTerms}</strong>
                </div>

                <div className="item">
                    <span>Avg Sentence</span>
                    <strong>
                        {document.avgSentenceLength.toFixed(1)}
                    </strong>
                </div>

             </div>

        </div>
    );
}

export default StudyInsights;