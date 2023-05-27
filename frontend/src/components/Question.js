import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import "../styles/question.css"
import "../styles/global.css"
import "../styles/button.css"

const Question = () => {
  const [question, setQuestion] = useState("");
  const { user } = useAuthContext();
  const [userfetch, setUserfetch] = useState(null);
  const [error, setError] = useState(null);

 useEffect(() => {
  if (user) {
    fetchUser();
  }
}, [user]);

  const fetchUser = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/protectedUser/id`,
        { email: user.email },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setUserfetch(response.data.user[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    if(question.length <= 0) {
      setError("Please enter a question");
      if(!user) {
        setError("You must be logged in to ask a question");
      }
    }
 
    else{
      if (userfetch) {
        axios.post("http://localhost:5000/api/email/sent",
            {
              email: user.email,
              question,
              name: userfetch.name + " " + userfetch.surname,
            },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          )
          .then((res) => {
            setQuestion(""); 
          })
          .catch((err) => {
            console.log(err);
          });
          setError("Question was sent successfully");
      }
    }
  };
  return (
    <div className="fade-in">
        <form onSubmit={handleSubmit}>
        <div className="main-question-container">
            <div className="question-container ">

                <h1 className="main-Title paddig-main-title white">Do you have a question?</h1>
                <p className="second-Title paddig-second-title white">Ask us and we will reply to you shortly via email message</p>
                <div className="question-box paddig-question">
                  <textarea
                  className="question-input"
                    value={question}
                    placeholder=" Ask a question..."
                    onChange={(e) => setQuestion(e.target.value)}/>
                  <button className="button" type="submit">Send</button>
                </div>
                <p className="white">{error}</p>
          
            </div>
        </div>
        </form>
    </div>
  );
};

export default Question;
