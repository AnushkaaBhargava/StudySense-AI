import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Flashcards.css";

function Flashcards({documentId}){

    const [flashcards,setFlashcards]=useState([]);
    const [index,setIndex]=useState(0);
    const [showAnswer,setShowAnswer]=useState(false);

    useEffect(()=>{

        async function fetchFlashcards(){
          
           try{
            
            const response=await api.get(`/pdf/flashcards/${documentId}`);

            setFlashcards(response.data.flashcards);
        }catch(error){
            
            console.log(error);
        }
        }

        if(documentId){
            fetchFlashcards();
        }

       
    },[documentId]);

    if(flashcards.length===0)
        return null;

    const card = flashcards[index];

    return(
        <div className="flashcards-container">

            <h2>AI Flashcards</h2>

            <div className="flashcard">
                <h3>
                    {card.question}
                </h3>

                 {
                    showAnswer &&
                    <p>
                        {card.answer}
                    </p>
                }
            </div>

            <button
              onClick={()=>setShowAnswer(!showAnswer)}
            >
                {showAnswer ? "Hide Answer" : "Show Answer"}
            </button>

            <div className="flashcard-buttons">

                <button
                 disabled={index===0}
                 onClick={()=>{
                    setIndex(index-1);
                    setShowAnswer(false);
                }}
                
                >
                    Previous
                </button>

                 <button
                disabled={index===flashcards.length-1}
                onClick={()=>{
                    setIndex(index+1);
                    setShowAnswer(false);
                }}
                >
                    Next
                </button>

            </div>

        </div>
    )
}

export default Flashcards;