// This component will hold the logic for displaying the questions
import React from "react";

export default function Question({question, options, onAnswer}){
   return(
      <div>
         <h2>{question}</h2>
         <h2>
         {options.map(function (option){
            return (
               <button
                  key={option}
                  onClick={function() {
                     onAnswer(option)
                  }}
               >
                  {option}
               </button>
            )
         })}
         </h2>
      </div>
   )
}