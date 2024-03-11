import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Result = () => {
  const user = useSelector(state => state.user);
  const token = user.token;
  const [score, setScore] = useState(null);

  function handleGoToHome (){
    navigate("/");
  }
  useEffect(() => {
    const getScore = async () => {
      try {
        const response = await fetch('http://localhost:3000/quiz/getscore', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          const latestScore = data?.quiz?.score;
          setScore([latestScore[latestScore.length - 1]]);
        } else {
          console.error('Failed to fetch quiz score');
        }
      } catch (error) {
        console.error('Error fetching quiz score:', error);
      }
    };
  
    if (token) {
      getScore();
    }
  }, [token]);
  

  const navigate = useNavigate();
  return (
    <div>
    <Header />
    <div className="h-screen flex justify-center items-center flex-col bg-gray-100 gap-4">
      <div className="w-full max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-md">
        <div className="text-3xl font-extrabold text-gray-800 mb-4">Quiz Completed!</div>
       {score&& <p>Your Score: {score}</p>}
      </div>
    <button onClick={handleGoToHome} className='w-md text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>Go to Home</button>

    </div>
  </div>
  )
}

export default Result