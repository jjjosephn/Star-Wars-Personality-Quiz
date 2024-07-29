//  This component will hold the links and title for our quiz and navigation links
import React from "react";
import { Link, useNavigate } from "react-router-dom"


export default function Header(){
   const navigate = useNavigate();

   const handleHomeClick = () => {
      resetState();
      navigate('/');
   };

   return(
      <header>
         <h1>Which Star Wars Character Are You?</h1>
         <nav>
            <Link to="/" onClick={handleHomeClick}>Home</Link>
            <Link to="/quiz">Quiz</Link>
         </nav>
      </header>
   )
}