import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { ExternalLink } from 'react-external-link';

const DeveloperDetailsScreen = () => {
  const [selectedProfile, setSelectedProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const { developerId } = useParams();

  const fetchDeveloper = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/profiles/${developerId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setSelectedProfile(data.profile);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching developer:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeveloper();
  }, [developerId]);

  return (
    <div className="bg-black text-white">
      {loading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto p-4">
          {Object.keys(selectedProfile).length > 0 && (
            <React.Fragment>
              <section className="text-center">
                <h1 className="text-3xl font-bold m-3">
                  <i className="fas fa-user-tie"></i> {selectedProfile.user.name}'s Profile
                </h1>
              </section>

              <section className=" text-white  p-4">
                <div className="flex flex-col items-center bg-neutral-950 py-4">
                  <img
                    src={selectedProfile.user.avatar}
                    alt="Profile"
                    className="rounded-full w-32 h-32 py-1"
                  />
                  <h2 className="text-2xl font-bold">{selectedProfile.user.name}</h2>
                  <p className="text-lg">{selectedProfile.website}</p>
                  <p className="text-lg">{selectedProfile.designation}</p>
                  <p className="text-lg">{selectedProfile.company}</p>
                  <p>Followers: {selectedProfile.followers.length}</p>
                  <p>Following: {selectedProfile.following.length}</p>
                  <p>{selectedProfile.location}</p>
                  <div className="flex items-center space-x-4 mt-4">
                    <ExternalLink href={selectedProfile.social.facebook} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-facebook text-2xl"></i>
                    </ExternalLink>
                    <ExternalLink href={selectedProfile.social.twitter} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter text-2xl"></i>
                    </ExternalLink>
                    <ExternalLink href={selectedProfile.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin text-2xl"></i>
                    </ExternalLink>
                    <ExternalLink href={selectedProfile.githubUserName} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-github text-2xl"></i>
                    </ExternalLink>
                    <ExternalLink href={selectedProfile.social.instagram} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-instagram text-2xl"></i>
                    </ExternalLink>
                    <ExternalLink href={selectedProfile.social.youtube} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-youtube text-2xl"></i>
                    </ExternalLink>
                  </div>
                </div>
              </section>

              <section className="container mx-auto mt-4">
                <div className="card bg-comment text-black my-4">
                  <div className="card-body">
                    <h2 className="text-2xl font-bold">{selectedProfile.user.name}'s Biography</h2>
                    <p>{selectedProfile.bio}</p>
                  </div>
                </div>

                <div className="card bg-light-grey text-teal my-4">
                  <div className="card-body">
                    <h2 className="text-2xl font-bold text-black">{selectedProfile.user.name}'s Skills</h2>
                    <div className="flex flex-wrap">
                      {selectedProfile.skills.map((skill, index) => (
                        <span key={index} className="badge badge-dark p-2 m-2">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProfile.experience.map(exp => (
                    <div key={exp._id} className="card bg-primary text-white  my-4">
                      <div className="card-body bg-neutral-900">
                        <h2 className="text-2xl font-bold">Experience</h2>
                        <p><span className="font-bold">Title:</span> {exp.title}</p>
                        <p><span className="font-bold">Company:</span> {exp.company}</p>
                        <p><span className="font-bold">Location:</span> {exp.location}</p>
                        <p><span className="font-bold">From:</span> {exp.from}</p>
                        <p><span className="font-bold">To:</span> {exp.to !== ' ' ? exp.to : 'Current'}</p>
                        <p><span className="font-bold">Description:</span> {exp.description}</p>
                      </div>
                    </div>
                  ))}

                  {selectedProfile.education.map(edu => (
                    <div key={edu._id} className="card bg-warning text-white my-4">
                      <div className="card-body bg-neutral-900">
                        <h2 className="text-2xl font-bold">Education</h2>
                        <p><span className="font-bold">School:</span> {edu.school}</p>
                        <p><span className="font-bold">Degree:</span> {edu.degree}</p>
                        <p><span className="font-bold">Field of Study:</span> {edu.fieldOfStudy}</p>
                        <p><span className="font-bold">From:</span> {edu.from}</p>
                        <p><span className="font-bold">To:</span> {edu.to !== ' ' ? edu.to : 'Current'}</p>
                        <p><span className="font-bold">Description:</span> {edu.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  );
};

export default DeveloperDetailsScreen;
