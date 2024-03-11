
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Result from './Result';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timer, setTimer] = useState(30); 
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const token = user.token;

  useEffect(() => {
    async function getQuestions() {
      const response = await fetch('http://localhost:3000/quiz/questions');
      const data = await response.json();
      setQuestions(data.questions);
    }
    getQuestions();
  }, []);

  useEffect(()=>{
    if(user?.isLogged){
      navigate('/quiz');
    }else{
      navigate("/login")
    }
  },[user?.isLogged]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);


  function handleQuizScoreDb() {
    const score = calculateScore();
    fetch('http://localhost:3000/quiz/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        score,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Score stored successfully:', data);
      })
      .catch((error) => {
        console.error('Error storing score:', error);
      });
  }
  

  const handleAnswerSubmit = (selectedOption) => {
    if (selectedOption === undefined) {
      setUserAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestionIndex]: null, 
      }));
    } else {
      setUserAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestionIndex]: selectedOption,
      }));
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setTimer(30);
  };
  

  if(timer===0){
    handleAnswerSubmit(undefined);
  }

  if (questions.length === 0) {
    return <p>Loading...</p>;
  }

  const calculateScore = () => {
    let score = 0;
    questions?.forEach((question, index) => {
      if (question?.correctAnswer === userAnswers[index] ) {
        score++;
      }
    });
    return score;
  };



  if (currentQuestionIndex === questions?.length) {
    handleQuizScoreDb();
    navigate("/result");
  }

  const currentQuestion = questions[currentQuestionIndex];


  return (
    <div>
      <div className="h-screen flex justify-center items-center flex-col bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-md">
          <div className="text-3xl font-extrabold text-gray-800 mb-4">Quiz Time!</div>
          <p className="text-gray-600 text-center mb-6">
            Question {currentQuestionIndex + 1}: Time Remaining - {timer} seconds
          </p>
          <h2 className="text-lg font-semibold mb-4">{currentQuestion?.question}</h2>
          <ul className="mt-4 space-y-2">
            {currentQuestion?.choices.map((choice, index) => (
              <li key={index}>
                <button
                  onClick={() => handleAnswerSubmit(choice)}
                  className="w-full bg-blue-500 text-white rounded-md py-2 transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                >
                  {choice}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
