import React from 'react';
import './chatUi.css'; // Importing the CSS file for styling

// Example data from JSON (multiple users)
const usersData = [
  {
    profileUrl: 'https://res.cloudinary.com/dkibt7upb/image/upload/v1743571014/uploads/itrnitydaksh%40gmail.com_post_1743571011852.jpeg.jpg',
    name: 'John Doe',
  },
  {
    profileUrl: 'https://via.placeholder.com/50',
    name: 'Jane Smith',
  },
  {
    profileUrl: 'https://via.placeholder.com/50',
    name: 'Mark Johnson',
  },
  {
    profileUrl: 'https://via.placeholder.com/50',
    name: 'Alice Brown',
  },
];

const ChatUI = () => {
  return (
    <div className="chat-container">
      {usersData.map((user, index) => (
        <div className="chat-card" key={index}>
          <img src={user.profileUrl} alt="profile" className="profile-img" />
          <div className="user-name">{user.name}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatUI;
