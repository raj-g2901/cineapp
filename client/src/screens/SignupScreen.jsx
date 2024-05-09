import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const SignupScreen = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [userError, setUserError] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
  });

  const validateUsername = (event) => {
    setUser({ ...user, name: event.target.value });
    const regExp = /^[a-zA-Z0-9]/;
    !regExp.test(event.target.value)
      ? setUserError({ ...userError, nameError: 'Enter a proper Username' })
      : setUserError({ ...userError, nameError: '' });
  };

  const validateEmail = (event) => {
    setUser({ ...user, email: event.target.value });
    const regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    !regExp.test(event.target.value) || event.target.value.trim() === ''
      ? setUserError({ ...userError, emailError: 'Enter a proper Email' })
      : setUserError({ ...userError, emailError: '' });
  };

  const validatePassword = (event) => {
    setUser({ ...user, password: event.target.value });
    if (event.target.value.trim() === '')
      setUserError({ ...userError, passwordError: 'Enter a proper Password' });
    else setUserError({ ...userError, passwordError: '' });
  };

  const submitRegistration = async (event) => {
    event.preventDefault();
    if (
      user.name.trim() !== '' &&
      user.email.trim() !== '' &&
      user.password.trim() !== ''
    ) {
      const { name, email, password } = user;
      try {
        const { status } = await axios.post(
          'http://localhost:4000/api/users/signup',
          { name, email, password },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (status === 201) {
          Swal.fire('User already exists', '', 'error');
          return;
        } else if (status === 200) {
          Swal.fire('Registration successful', '', 'success');
          navigate('/users/login');
        }
      } catch (error) {
        console.error('Error registering user:', error);
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
            <h1 className="text-4xl font-bold text-white mb-4">Registration</h1>
            <p className="text-gray-300 mb-4">Get Into The World Of Cinema!</p>
          </div>
        </div>
      </section>
      <section className=" bg-neutral-950 min-h-screen">
        <div className="container mx-auto">
          <div className="flex justify-center items-center">
            <div className="w-full max-w-md">
              <form onSubmit={submitRegistration}>
                <div className="mb-4">
                  <input
                    required
                    name="name"
                    value={user.name}
                    onChange={validateUsername}
                    type="text"
                    className={`bg-gray-100 border-2 w-full p-3 rounded-md ${
                      userError.nameError.length > 0 ? 'border-red-500' : ''
                    }`}
                    placeholder="Name"
                  />
                  {userError.nameError.length > 0 && (
                    <small className="text-red-500">{userError.nameError}</small>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    required
                    name="email"
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
                    required
                    name="password"
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
                    Register
                  </button>
                </div>
              </form>
              <small className="block text-center text-gray-500">
                Already have an account?
                <Link to="/users/login" className="font-bold text-white ml-1">
                  Login
                </Link>
              </small>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupScreen;
