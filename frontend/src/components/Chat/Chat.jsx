import { useState } from "react";
import api from "../../services/api";
import "./Chat.css";


function Chat({documentId}) {

    const [question,setQuestion] = useState("");
    const [messages,setMessages] = useState([]);

    const [loading,setLoading] = useState(false);


    async function sendQuestion(){

        if(!question) return;


        const userMessage = {
            role:"user",
            text:question
        };


        setMessages(prev => [
            ...prev,
            userMessage
        ]);


        try{

            setLoading(true);


            const response = await api.post(
                "/chat",
                {
                    documentId,
                    question
                }
            );


            const aiMessage = {
                role:"ai",
                text:response.data.answer
            };


            setMessages(prev => [
                ...prev,
                aiMessage
            ]);


        }
        catch(error){

            console.log(error);

        }
        finally{

            setLoading(false);
            setQuestion("");

        }

    }


    return (

        <div className="chat-box">


            <div className="messages">

                {
                    messages.map((msg,index)=>(

                        <div 
                        key={index}
                        className={msg.role}
                        >

                            {msg.text}

                        </div>

                    ))
                }


                {
                    loading && 
                    <div className="ai">
                        Thinking...
                    </div>
                }


            </div>



            <div className="chat-input">


                <input

                value={question}

                onChange={(e)=>setQuestion(e.target.value)}

                placeholder="Ask anything about your notes..."

                />


                <button onClick={sendQuestion}>
                    Send
                </button>


            </div>


        </div>

    )

}


export default Chat;