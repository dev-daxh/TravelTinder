import React from 'react';
import './slidebarmenu.jsx'; // Importing the CSS file for styling

// Example data from JSON
const userData = {
  profileUrl: 'https://via.placeholder.com/50', // Example profile image URL
  name: 'John Doe', // Example user name
};

const ChatUI = () => {
  return (
    <div className="chat-container">
      <div className="chat-card">
        <img src={userData.profileUrl} alt="profile" className="profile-img" />
        <div className="user-name">{userData.name}</div>
      </div>
    </div>
  );
};

export default ChatUI;
