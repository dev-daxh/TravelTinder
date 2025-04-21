import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './chatMain.css'; // Importing the CSS file for styling
import Loader from '../loader'; // Adjust path as needed
import { useNavigate } from 'react-router-dom'; // Importing useHistory for navigation
import SubscriptionModal from '../subscriptionModel'; // Import SubscriptionModal
import LogoComponent from '../logoCom';
const ChatUI = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch profiles from the API when the component mounts
  useEffect(() => {
    const email = localStorage.getItem('email'); // Get the email from local storage
    if (!email) {
      console.error('Email not found in local storage');
      return;
    }
    // Fetching profiles from the API
    axios
      .post('http://localhost:3001/api/home/getchatdata', { email }) // Replace with your API endpoint
      .then((response) => {
        setProfiles(Object.values(response.data.profiles)); // Assuming 'profiles' is an object in the response
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching profiles:', error);
        setLoading(false);
      });
  }, []);

  // Function to handle the click event and show profile name in alert
  const handleNameClick = (firstName, lastName, profilePicture) => {
    const subscriptionStatus = localStorage.getItem("subscription");

    if (subscriptionStatus !== "done") {
      setShowModal(true); // Show the animated modal if subscription is not done
      return;
    }

    localStorage.setItem('chatName', firstName);
localStorage.setItem('chatProfile', profilePicture);
console.log(`Chat name set: ${firstName}, Chat profile picture set: ${profilePicture}`);

    navigate('/chat-user'); // Navigate to the chat page
  };

  // Show loader while data is being fetched
  if (loading) {
    return <Loader message="Loading chat profiles..." />;
  }

  const handleBack = () => {
    // Redirect to the previous page
    window.history.back();
  };

  return (
    <div className="chat-container">
      <LogoComponent />
      <br /><br />
      <header>
        <button onClick={handleBack} className="back-button">&#8592;</button>
      </header>

      {profiles.length > 0 ? (
        profiles.map((profile, index) => (
          <div className="chat-card" key={index}>
            <img
              src={profile.profilePicture || 'https://via.placeholder.com/150'}
              alt={`${profile.firstName} ${profile.lastName}`}
              className="profile-img"
            />
            <div
              className="user-name"
              onClick={() => handleNameClick(profile.firstName, profile.lastName, profile.profilePicture)}
            >
              {profile.firstName} {profile.lastName}
            </div>
          </div>
        ))
      ) : (
        <div className="no-profiles">No chat profiles available</div>
      )}

      {/* Render the modal if showModal is true */}
      {showModal && <SubscriptionModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ChatUI;
