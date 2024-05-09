import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [userError, setUserError] = useState({
    emailError: '',
    passwordError: '',
  });

  useEffect(() => {
    if (localStorage.getItem('devroom')) {
      navigate('/');
    }
  }, []);

  const validateEmail = (event) => {
    setUser({ ...user, email: event.target.value });
    const regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    !regExp.test(event.target.value)
      ? setUserError({ ...userError, emailError: 'Enter a proper Email' })
      : setUserError({ ...userError, emailError: '' });
  };

  const validatePassword = (event) => {
    setUser({ ...user, password: event.target.value });
    if (event.target.value.trim() === '')
      setUserError({ ...userError, passwordError: 'Enter a proper Password' });
    else setUserError({ ...userError, passwordError: '' });
  };

  const submitLogin = async (event) => {
    event.preventDefault();
    if (user.email !== '' && user.password !== '') {
      const { email, password } = user;
      try {
        const { status, data } = await axios.post(
          'http://localhost:4000/api/users/login',
          { email, password },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (status === 201) {
          Swal.fire('Invalid credentials', '', 'error');
        } else if (status === 200) {
          Swal.fire('Login successful', '', 'success');
          localStorage.setItem('devroom', data.token);
          navigate('/developers');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        Swal.fire('Oh no!', 'Something went wrong! Try again', 'error');
      }
    } else {
      Swal.fire('Oh no!', 'Something went wrong! Try again', 'error');
    }
  };

  return (
    <>
      <section className="bg-neutral-950 pt-8">
        <div className="container mx-auto">
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-4xl font-bold text-white mb-4">Login</h1>
            <p className="text-gray-300 ">Get Into The World Of Cinema!</p>
          </div>
        </div>
      </section>
      <section className="py-8 bg-neutral-950 min-h-screen">
        <div className="container mx-auto">
          <div className="flex justify-center items-center">
            <div className="w-full max-w-md">
              <form onSubmit={submitLogin}>
                <div className="mb-4">
                  <input
                    name="email"
                    required
                    value={user.email}
                    onChange={validateEmail}
                    type="email"
                    className={`bg-gray-100 border-2 w-full p-3 rounded-md ${
                      userError.emailError.length > 0 ? 'border-red-500' : ''
                    }`}
                    placeholder="Email"
                  />
                  {userError.emailError.length > 0 && (
                    <small className="text-red-500">{userError.emailError}</small>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    name="password"
                    required
                    value={user.password}
                    onChange={validatePassword}
                    type="password"
                    className={`bg-gray-100 border-2 w-full p-3 rounded-md ${
                      userError.passwordError.length > 0 ? 'border-red-500' : ''
                    }`}
                    placeholder="Password"
                  />
                  {userError.passwordError.length > 0 && (
                    <small className="text-red-500">{userError.passwordError}</small>
                  )}
                </div>
                <div className="mb-4">
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-md transition duration-300 ease-in-out hover:bg-teal-600"
                  >
                    Login
                  </button>
                </div>
              </form>
              <small className="block text-center text-gray-500">
                Don't have an account?
                <Link to="/users/signup" className="font-bold text-white ml-1">
                  Register
                </Link>
              </small>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginScreen;
