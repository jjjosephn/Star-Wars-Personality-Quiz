import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Question from './components/Question.jsx';
import Results from './components/Results.jsx';
import UserForm from './components/UserForm.jsx';
import { UserProvider } from './components/UserContext.jsx';
import axios from 'axios';

const questions = [
  {
    question: "What's your greatest strength?",
    options: ["Optimism", "Loyalty", "Intellect", "Patience"],
  },
  {
    question: "Where would you rather stay?",
    options: ["On Land", "In Water"],
  },
  {
    question: "What is your favorite color?",
    options: ["Green", "Red", "Blue", "Purple"],
  },
  {
    question: "What animal would you rather choose as your pet?",
    options: ["Bear", "Penguin", "Fox", "Bat"],
  },
];

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState('');
  const [artwork, setArtwork] = useState(null);

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleUserFormSubmit = (name) => {
    setUserName(name);
  };

  const fetchArtwork = async () => {
    try {
      const response = await axios.get('https://akabab.github.io/starwars-api/api/all.json');
      const data = response.data;
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomID = data[randomIndex].id;

      const artworkResponse = await axios.get(`https://akabab.github.io/starwars-api/api/id/${randomID}.json`);
      console.log('Fetched artwork data:', artworkResponse.data);
      setArtwork(artworkResponse.data);  
    } catch (error) {
      console.error('Error fetching artwork:', error);
      setArtwork(null);
    }
  };

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      fetchArtwork();
    }
  }, [currentQuestionIndex]);

  const resetState = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setUserName('');
    setArtwork(null);
  };

  return (
    <UserProvider value={{ name: userName, setName: setUserName }}>
      <Router>
        <Header resetState={resetState}/>
        <Routes>
          <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
              ) : (
                <Results artwork={artwork} />
              )
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
};

