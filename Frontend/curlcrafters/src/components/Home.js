import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Home = () => {
  const user = useSelector(state => state.user);
  const token = user.token;
  console.log(token);
  const [score, setScore] = useState(null)
  const [showScores , setShowScores] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.isLogged){
      navigate('/');
    }else{
      navigate("/login")
    }
  },[user?.isLogged]);

  function handleStartClick(){
    navigate('/quiz')
  }
  useEffect(()=>{
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
          const last10Scores = latestScore.slice(-10).reverse();
          setScore(last10Scores);
        } else {
          console.error('Failed to fetch quiz score');
        }
      } catch (error) {
        console.error('Error fetching quiz score:', error);
      }
    };
    if(token){
      getScore();
    }
  }, [token])

  return (
    <div>
    
      <Header/>
      <div className="flex justify-between p-8">
      
        <div className="w-1/4">
        <h1 onClick={() => setShowScores(!showScores)} className="  cursor-pointer text-xl font-semibold mb-4 ">Your Last Performances</h1>
          { score &&  showScores && <div className="space-y-2">
            {score &&
              score.map((score, index) => (
                <p key={index} className="text-lg">
                 score :  {score}
                </p>
              ))}
          </div>
          }
          
        </div>
        <div className="w-1/2">
          <div className="h-screen flex justify-center flex-col">
            <div className="block w-[20rem] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
              <div className="text-3xl font-extrabold mb-4">Quiz Time!</div>
              <p className="text-gray-600 text-center mb-6">
                Welcome! Are you ready to test your knowledge?
              </p>
              <button
                onClick={handleStartClick}
                className="w-full text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home


