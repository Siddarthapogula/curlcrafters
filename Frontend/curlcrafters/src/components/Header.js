import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { adduser, removeUserInfo, removeUserToken } from '../store/userSlice';

const Header = () => {
  const dispatch = useDispatch();

  function handleSignOut(){
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      dispatch(adduser());
      dispatch(removeUserInfo());
      dispatch(removeUserToken());
  }
  
  const user = useSelector(state => state.user);
  return (
    <div>
        <div className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Quiz App</h1>
              </div>
              <div className=' flex items-center'>
                <p className="text-sm"> {user?.userInfo ? " Welcome"+ user?.userInfo : "Get Started"}</p>
                <button className=' pl-[3rem] text-md font-semibold ' onClick={handleSignOut}>{user?.userInfo ? "Logout" :null}</button>
              </div>
            </div>
          </div>
    </div>
  )
}

export default Header