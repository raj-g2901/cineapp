import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axios from 'axios';

const DeveloperScreen = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem('devroom')) {
      setLoggedIn(true);
    }
  }, []);

  const getUser = async () => {
    const { data } = await axios.get(
      'http://localhost:4000/api/users/me',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('devroom')}`,
        },
      }
    );
    setUser(data.user);
  };

  const fetchProfiles = async () => {
    const { data } = await axios.get(
      'http://localhost:4000/api/profiles/all',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    setProfiles(data.profiles);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfiles();
    if (loggedIn) {
      getUser();
    }
  }, [loggedIn]);

  const clickFollowUser = async (profileId) => {
    const { data } = await axios.put(
      `http://localhost:4000/api/profiles/follow/${profileId}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('devroom')}`,
        },
      }
    );
    fetchProfiles();
  };

  return (
    <>
      <section className="bg-black py-12 text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-white">
            Film Makers All Around The World
          </h1>
        </div>
      </section>
      <section className="pt-8 bg-black min-h-screen">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {profiles.length > 0 && (
              <div className="container mx-auto">
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                  {profiles.map((profile) => (
                    <div
                      className="bg-white rounded-lg shadow-md p-8 mb-8"
                      key={profile._id}
                    >
                      <div className="flex items-center mb-4">
                        <img
                          src={profile.user.avatar}
                          className="w-16 h-16 rounded-full mr-4"
                          alt=""
                        />
                        <div>
                          <h2 className="text-lg font-semibold text-gray-800">
                            {profile.user.name}
                          </h2>
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-bold">Position:</span>{' '}
                            {profile.designation}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-bold">Company:</span>{' '}
                            {profile.company}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-bold">Location:</span>{' '}
                            {profile.location}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-bold">Website:</span>{' '}
                            {profile.website}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {profile.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-200 px-3 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <Link
                          to={`/developers/${profile._id}`}
                          className="bg-black hover:bg-teal-700 text-white px-4 py-2 rounded-md mr-2"
                        >
                          View Profile
                        </Link>
                        {loggedIn &&
                          profile.user._id !== user._id &&
                          (profile.followers.includes(user._id) ? (
                            <button
                              className="bg-black hover:bg-blue-600 text-white px-4 py-2 rounded-md ml-2"
                              onClick={() => clickFollowUser(profile._id)}
                            >
                              Unfollow
                            </button>
                          ) : (
                            <button
                              className="bg-black hover:bg-teal-600 text-white px-4 py-2 rounded-md ml-2"
                              onClick={() => clickFollowUser(profile._id)}
                            >
                              Follow
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default DeveloperScreen;
