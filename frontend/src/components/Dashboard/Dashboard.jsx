import Chat from "../Chat/Chat";
import Flashcards from "../Flashcards/Flashcards";

function Dashboard({ document }) {

    return (

        <div className="dashboard">

            <h1>{document.fileName}</h1>

            <h2>Summary</h2>

            <p>{document.summary}</p>

            <Flashcards documentId={document._id}/>

            <Chat documentId={document._id}/>

        </div>

    );

}

export default Dashboard;