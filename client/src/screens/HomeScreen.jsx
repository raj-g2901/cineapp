import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bg from '../assets/bg.jpg';
import '../css/homePageBg.css';



const HomeScreen = () => {
  const navigate = useNavigate();

  const clickLogOut = () => {
    localStorage.removeItem('devroom');
    navigate('/users/login');
  };

  return (
    <>
      <div
        className="bg-cover bg-center min-h-screen flex  justify-center background-image"
      >
        <div className="max-w-lg  text-center">
          <h1 className="text-5xl text-white font-bold  mt-20 pt-5">THE FILM COMMUNITY</h1>
          <p className="text-[17px] text-gray-300 mb-8 mt-4 w-full">
            A website for developers where they can post their works, update
            profile and connect to other developers across the globe .
          </p>
          {localStorage.getItem('devroom') ? (
            <div className="flex justify-center">
              <button
                type="button" onClick={clickLogOut}
                className="text-white bg-black border-white border-2 rounded-full px-4 py-2 hover:bg-gray-800 hover:border-gray-800"
              >
               Logout
              </button>

            </div>
          ) : (
            <div className="flex justify-center">
              <Link
                to="/users/signup"
                className="text-white bg-black mx-5 border-white border-2 rounded-full px-4 py-2 hover:bg-gray-800 hover:border-gray-800"
              >
                Register
              </Link>
              <Link
                to="/users/login"
                className="text-white bg-black mx-5 border-white border-2 rounded-full px-4 py-2 hover:bg-gray-800 hover:border-gray-800"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
