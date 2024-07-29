// This component will have a search input that holds the name of the person taking the quiz for personalization
import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from 'react-router-dom';

export default function UserForm(){
   const [inputName, setInputName] = useState("")
   const {setName} = useContext(UserContext)
   const navigate = useNavigate();

   function handleSubmit(e) {
      e.preventDefault();
      setName(inputName);
      navigate('/quiz');
    }

   return(
      <div>
         <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input 
               type="text" 
               value={inputName}
               onChange={(e) => setInputName(e.target.value)}
            />
            <button type="submit">Start Quiz</button>
         </form>
      </div>
   )
}