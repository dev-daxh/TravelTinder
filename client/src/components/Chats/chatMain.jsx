import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './chatMain.css'; // Importing the CSS file for styling
import Loader from '../loader'; // Adjust path as needed
import { useNavigate } from 'react-router-dom'; // Importing useHistory for navigation

const ChatUI = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch profiles from the API when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/chat/get-chat-main') // Replace with your API endpoint
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
    alert(`Profile name: ${firstName} ${lastName}`);
    localStorage.setItem('chatName', firstName); 
    localStorage.setItem('chatProfile', profilePicture); 
    navigate('/chat-user'); // Navigate to the chat page
  };

  // Show loader while data is being fetched
  if (loading) {
    return <Loader message="Loading chat profiles..." />;
  }

  return (
    <div className="chat-container">
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
    </div>
  );
};

export default ChatUI;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AllProfiles = () => {
//   const [profiles, setProfiles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   axios
//   //     .get('http://localhost:3001/api/chat/get-chat-main')
//   //     .then((response) => {
//   //       setProfiles(Object.values(response.data.profiles));
//   //       setLoading(false);
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error fetching profiles:', error);
//   //       setLoading(false);
//   //     });
//   // }, []);

//   // if (loading) {
//   //   return <div className="loading">Loading profiles...</div>;
//   // }

//   return (
//     <div className="chat-home">
//       {profiles.map((profile, index) => (
//         <div key={index} className="chat-card">
//           <div className="chat-card-avatar">
//             <img
//               src={profile.profilePicture || 'https://via.placeholder.com/150'}
//               alt={`${profile.firstName} ${profile.lastName}`}
//             />
//           </div>
//           <div className="chat-card-content">
//             <h3>{profile.firstName} {profile.lastName}</h3>
//             <p className="last-message">{profile.bio || "Hey there! I'm using WhatsApp"}</p>
//           </div>
//           <div className="chat-card-meta">
//             <span className="time">12:30 PM</span>
//             {profile.unreadCount > 0 && (
//               <span className="badge">{profile.unreadCount}</span>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AllProfiles;