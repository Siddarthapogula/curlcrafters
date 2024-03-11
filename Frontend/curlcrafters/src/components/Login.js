import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { createSearchParams, useNavigate } from 'react-router-dom'
import {addUserInfo, addUserToken, adduser} from '../store/userSlice'
import axios from 'axios'
import Header from './Header'

const Login = ()=> {

const [isSign, setIsSign] = useState(true);
const username = React.useRef('');
const email = React.useRef('');
const password = React.useRef('');
const navigate = useNavigate();
const dispatch = useDispatch()
const user = useSelector(store => store.user);
useEffect(() => {
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');

  if (storedUser && storedToken) {
    dispatch(addUserInfo(JSON.parse(storedUser)));
    dispatch(addUserToken(storedToken));
    dispatch(adduser());
  }
}, [dispatch]);
if(user?.isLogged){
  navigate("/");
}

function handleSignOrNot(){
    setIsSign(!isSign);
}

async function handleSignClick() {
    if (isSign) {
      const signInData = {
        username: (username.current.value),
        password: (password.current.value)
      };  
      const isUserResponse = await fetch('http://localhost:3000/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signInData),
      });
      const data = await isUserResponse.json();
      console.log(data);
      if(data?.result){
        dispatch(addUserInfo(signInData.username));
        dispatch(addUserToken(data?.token));
        dispatch(adduser());
        localStorage.setItem('user', JSON.stringify(signInData.username));
        localStorage.setItem('token', data?.token);
        navigate("/")
      }
    }
    
    else{
      const signUpData = {
        username: (username.current.value),
        email : (email.current.value),
        password: (password.current.value)
      }; 
      const user = await axios.post('http://localhost:3000/user/signup', signUpData);
      const data = user.data
      navigate("/");
    }
  }
  

  return (
    <>
    <Header/>
      <div className="h-screen flex justify-center flex-col">
          <div className="flex justify-center">
                  <div className=' block w-[20rem]  p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 '>
                      <div className="px-10">
                          <div className="text-3xl font-extrabold">{isSign ? "Sign In" : "Sign Up"}</div>
                      </div>
                     { !isSign ? <div className="pt-2"> 
                        <label className="block mb-2 text-sm text-black font-semibold pt-4">Email</label>
                        <input ref={email} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                     </div>: <></> }
                      <div className="pt-2"> 
                        <label className="block mb-2 text-sm text-black font-semibold pt-4">Username</label>
                        <input ref={username} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                     </div> 
                     <div className="pt-2"> 
                        <label className="block mb-2 text-sm text-black font-semibold pt-4">Password</label>
                        <input ref={password} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                     </div> 
                          <button className="mt-8 w-full  text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={handleSignClick}>{isSign ? "Sign In" : "Sign Up"}</button>

                          <p className='text-center text-sm cursor-pointer  hover:underline' onClick={handleSignOrNot}>{isSign ? "Don't have an account?" : "Already have an account?"}</p>
                      </div>

                  </div>
          </div>
      </>
  );
}

export default Login