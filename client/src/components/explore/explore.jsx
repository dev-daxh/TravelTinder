// import React, { useState } from "react";
// import "./explore.css"; // Import CSS for styling

// const usersData = [
//   {
//     username: "padole_niraj22",
//     name: "Niraj.........",
//     mutual: "Followed by samrudhiiii...",
//     profilePic: "https://via.placeholder.com/50"
//   },
//   {
//     username: "madhura__mehar",
//     name: "Dancer || Madhura",
//     mutual: "Followed by harshalana...",
//     profilePic: "https://via.placeholder.com/50"
//   },
//   {
//     username: "saloniiii_raut__",
//     name: "",
//     mutual: "Followed by samikshaa...",
//     profilePic: "https://via.placeholder.com/50"
//   },
//   {
//     username: "_shwetaa_16",
//     name: "sHwEtAaaa....♡",
//     mutual: "Followed by samrudhiiii...",
//     profilePic: "https://via.placeholder.com/50"
//   },
//   {
//     username: "baby_girl_nihira",
//     name: "🐥 Nihira Sarve 🐥",
//     mutual: "Followed by akshays13...",
//     profilePic: "https://via.placeholder.com/50"
//   },
// ];

// const FollowPage = () => {
//   const [followedUsers, setFollowedUsers] = useState({});

//   const handleFollow = (username) => {
//     setFollowedUsers((prev) => ({
//       ...prev,
//       [username]: !prev[username],
//     }));
//   };

//   return (
//     <div className="follow-page">
//       {usersData.map((user, index) => (
//         <div key={index} className="user-card">
//           <img src={user.profilePic} alt={user.username} className="profile-pic" />
//           <div className="user-info">
//             <span className="username">{user.username}</span>
//             <span className="name">{user.name}</span>
//             <span className="mutual">{user.mutual}</span>
//           </div>
//           <button
//             className={`follow-btn ${followedUsers[user.username] ? "following" : ""}`}
//             onClick={() => handleFollow(user.username)}
//           >
//             {followedUsers[user.username] ? "Following" : "Follow"}
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FollowPage;
import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUserFriends, FaHeart, FaTimes } from 'react-icons/fa';
import './explore.css';

// Mock data for open trips
const mockTrips = [
  {
    id: 1,
    destination: "Goa, India",
    image: "https://images.unsplash.com/photo-1601485586342-c40ea828b062",
    startDate: "2023-11-15",
    endDate: "2023-11-25",
    host: {
      name: "Priya Sharma",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      bio: "Goa native with a passion for beach adventures and local culture"
    },
    description: "Join our group of travelers for an unforgettable experience exploring Goa’s beautiful beaches, vibrant markets, and rich history. All expenses shared equally.",
    spotsLeft: 2,
    groupSize: 4
  },
  {
    id: 2,
    destination: "Jaipur, India",
    image: "https://images.unsplash.com/photo-1565609192-5f2764e8e772",
    startDate: "2023-12-05",
    endDate: "2023-12-15",
    host: {
      name: "Amit Kumar",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Jaipur guide with a deep love for Rajasthan's heritage and culture"
    },
    description: "Join our group during the stunning winter season to explore the palaces, forts, and vibrant bazaars of Jaipur. Let’s discover the rich cultural history together.",
    spotsLeft: 1,
    groupSize: 4
  },
  {
    id: 3,
    destination: "Leh-Ladakh, India",
    image: "https://images.unsplash.com/photo-1581487447977-08e7b62f0e44",
    startDate: "2024-05-10",
    endDate: "2024-05-20",
    host: {
      name: "Ravi Desai",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      bio: "Experienced adventure guide and outdoor enthusiast, specializing in high-altitude treks"
    },
    description: "A unique trekking adventure through the mesmerizing landscapes of Leh-Ladakh. Perfect for those who enjoy nature, mountains, and photography. We’ll hike through the Nubra Valley, Pangong Lake, and more.",
    spotsLeft: 3,
    groupSize: 5
  }
];


const Explore = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openTripModal = (trip) => {
    setSelectedTrip(trip);
    setIsModalOpen(true);
  };

  const closeTripModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTrip(null), 300); // Wait for animation to finish
  };

  const handleJoinRequest = () => {
    console.log(`Request to join trip to ${selectedTrip.destination} sent`);
    closeTripModal();
    // In a real app, you would send a request to the server here
  };

  return (
    <div className="explore-container">
      <h1 className="explore-title">Open Trips to Join</h1>
      <p className="explore-subtitle">Find groups looking for travel companions</p>
      
      <div className="trips-grid">
        {mockTrips.map(trip => (
          <div 
            key={trip.id} 
            className="trip-card"
            onClick={() => openTripModal(trip)}
          >
            <div 
              className="trip-image"
              style={{ backgroundImage: `url(${trip.image})` }}
            >
              <div className="trip-badge">
                <FaUserFriends className="badge-icon" />
                <span>{trip.spotsLeft} spot{trip.spotsLeft !== 1 ? 's' : ''} left</span>
              </div>
            </div>
            
            <div className="trip-info">
              <h3 className="trip-destination">
                <FaMapMarkerAlt className="icon" /> {trip.destination}
              </h3>
              <div className="trip-dates">
                <FaCalendarAlt className="icon" />
                <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
              </div>
              <div className="trip-host">
                <img src={trip.host.avatar} alt={trip.host.name} className="host-avatar" />
                <span>Hosted by {trip.host.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trip Detail Modal */}
      {selectedTrip && (
        <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`} onClick={closeTripModal}>
          <div className="trip-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={closeTripModal}>
              <FaTimes />
            </button>
            
            <div 
              className="modal-image"
              style={{ backgroundImage: `url(${selectedTrip.image})` }}
            >
              <div className="modal-badge">
                <FaUserFriends className="badge-icon" />
                <span>{selectedTrip.spotsLeft} spot{selectedTrip.spotsLeft !== 1 ? 's' : ''} left (Group of {selectedTrip.groupSize})</span>
              </div>
            </div>
            
            <div className="modal-content">
              <h2 className="modal-destination">
                <FaMapMarkerAlt className="icon" /> {selectedTrip.destination}
              </h2>
              
              <div className="modal-dates">
                <FaCalendarAlt className="icon" />
                <span>
                  {new Date(selectedTrip.startDate).toLocaleDateString('en-US', { 
                    month: 'long', day: 'numeric', year: 'numeric' 
                  })} - {new Date(selectedTrip.endDate).toLocaleDateString('en-US', { 
                    month: 'long', day: 'numeric', year: 'numeric' 
                  })}
                </span>
              </div>
              
              <div className="modal-description">
                <h3>Trip Details</h3>
                <p>{selectedTrip.description}</p>
              </div>
              
              <button className="join-button" onClick={handleJoinRequest}>
                Request to Join
              </button>
              
              <div className="modal-host">
                <img src={selectedTrip.host.avatar} alt={selectedTrip.host.name} className="host-avatar" />
                <div className="host-info">
                  <h4>Hosted by {selectedTrip.host.name}</h4>
                  <p className="host-bio">{selectedTrip.host.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;