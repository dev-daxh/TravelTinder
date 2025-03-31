import React, { useState } from "react";
import "./explore.css"; // Import CSS for styling

const usersData = [
  {
    username: "padole_niraj22",
    name: "Niraj.........",
    mutual: "Followed by samrudhiiii...",
    profilePic: "https://via.placeholder.com/50"
  },
  {
    username: "madhura__mehar",
    name: "Dancer || Madhura",
    mutual: "Followed by harshalana...",
    profilePic: "https://via.placeholder.com/50"
  },
  {
    username: "saloniiii_raut__",
    name: "",
    mutual: "Followed by samikshaa...",
    profilePic: "https://via.placeholder.com/50"
  },
  {
    username: "_shwetaa_16",
    name: "sHwEtAaaa....♡",
    mutual: "Followed by samrudhiiii...",
    profilePic: "https://via.placeholder.com/50"
  },
  {
    username: "baby_girl_nihira",
    name: "🐥 Nihira Sarve 🐥",
    mutual: "Followed by akshays13...",
    profilePic: "https://via.placeholder.com/50"
  },
];

const FollowPage = () => {
  const [followedUsers, setFollowedUsers] = useState({});

  const handleFollow = (username) => {
    setFollowedUsers((prev) => ({
      ...prev,
      [username]: !prev[username],
    }));
  };

  return (
    <div className="follow-page">
      {usersData.map((user, index) => (
        <div key={index} className="user-card">
          <img src={user.profilePic} alt={user.username} className="profile-pic" />
          <div className="user-info">
            <span className="username">{user.username}</span>
            <span className="name">{user.name}</span>
            <span className="mutual">{user.mutual}</span>
          </div>
          <button
            className={`follow-btn ${followedUsers[user.username] ? "following" : ""}`}
            onClick={() => handleFollow(user.username)}
          >
            {followedUsers[user.username] ? "Following" : "Follow"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default FollowPage;