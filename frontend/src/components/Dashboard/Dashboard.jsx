import Chat from "../Chat/Chat";

function Dashboard({ document }) {

    return (

        <div className="dashboard">

            <h1>{document.fileName}</h1>

            <h2>Summary</h2>

            <p>{document.summary}</p>

            <Chat documentId={document._id}/>

        </div>

    );

}

export default Dashboard;