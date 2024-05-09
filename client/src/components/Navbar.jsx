import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import cinelogo from '../assets/cinelogo.png';

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const { data } = await axios.get(
        'https://devgram-backend.onrender.com/api/users/me',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('devroom')}`,
          },
        }
      );
      setUser(data.user);
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('devroom')) {
      getUser();
    }
  }, []);

  const clickLogOut = () => {
    localStorage.removeItem('devroom');
    navigate('/users/login');
  };

  const beforeLogin = (
    <>
      <li className="nav-item text-white">
        <Link to="/users/signup" className="nav-link">
          Register
        </Link>
      </li>
      <li className="nav-item text-white">
        <Link to="/users/login" className="nav-link">
          Login
        </Link>
      </li>
    </>
  );

  const afterLogin = (
    <>
      <li className="nav-item text-white">
        <Link to="/posts/list" className="nav-link">
          <i className="fa fa-list" /> Posts
        </Link>
      </li>
      <li className="nav-item text-white">
        <Link to="/posts/follow-post" className="nav-link">
          <i className="fa fa-list" /> Follow Post
        </Link>
      </li>
      <li className="nav-item text-white">
        <Link to="/profiles/dashboard" className="nav-link">
          <i className="fa fa-sitemap" /> Dashboard
        </Link>
      </li>
      <li className="nav-item text-white">
        <Link to="/" className="nav-link">
          <img
            src={user.avatar}
            alt=""
            width="25"
            height="25"
            className="rounded-circle"
          />
        </Link>
      </li>
      <li className="nav-item text-white">
        <Link to="/" className="nav-link" onClick={clickLogOut}>
          LogOut
        </Link>
      </li>
    </>
  );

  return (
    <>
      <nav className="bg-black ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-20">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-white">
                  <img src={cinelogo} alt="CineLogo" className='h-16' />
                </Link>
              </div>

            </div>
            <div className="hidden md:flex md:items-center md:ml-6">

              <ul className="flex space-x-4">
                <li className="nav-item">
                  <Link to="/developers" className="nav-link text-white">
                    <i className="fa fa-user-tie" /> Film Makers
                  </Link>
                </li>
                {localStorage.getItem('devroom') ? afterLogin : beforeLogin}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
