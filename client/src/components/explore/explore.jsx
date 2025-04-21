import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUserFriends, FaHeart, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './explore.css';

const Explore = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trips from API
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/explore/get-all-trip');
        setTrips(response.data.trips); // this extracts the actual array
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const openTripModal = (trip) => {
    setSelectedTrip(trip);
    setIsModalOpen(true);
  };

  const closeTripModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTrip(null), 300);
  };

  const handleJoinRequest = async () => {
    try {
      const userEmail = localStorage.getItem('email'); // Get logged in user's email
      if (!userEmail) {
        alert('Please login to join a trip');
        return;
      }

      // await axios.post('http://localhost:3001/api/trips/join-request', {
      //   tripId: selectedTrip._id,
      //   userEmail: userEmail
      // });

      alert('Join request sent successfully!');
      closeTripModal();
      
      // Update the trips list to reflect the new request
      const updatedTrips = trips.map(trip => {
        if (trip._id === selectedTrip._id) {
          return {
            ...trip,
            requestUsers: [...(trip.requestUsers || []), userEmail]
          };
        }
        return trip;
      });
      setTrips(updatedTrips);
    } catch (err) {
      alert('Error sending join request: ' + err.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading trips...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }
const handleBack = () => {
  window.history.back();
}
  return (
    <div className="explore-container">
     <button onClick={handleBack} className="back-button-explore">&#8592;</button>

      <h1 className="explore-title">Open Trips to Join</h1>
      <p className="explore-subtitle">Find groups looking for travel companions</p>
      
      <div className="trips-grid">
        {trips.map(trip => (
          <div 
            key={trip._id} 
            className="trip-card"
            onClick={() => openTripModal(trip)}
          >
            <div 
              className="trip-image"
              style={{ backgroundImage: `url(https://indusringette.ca/cloud/IndusRingette/files/time-to-travel-wooden-sign-beach-background-49509295.jpg)` }} // Default image or use trip.image if available
            >
              <div className="trip-badge">
                <FaUserFriends className="badge-icon" />
                <span>
                  {trip.maxGroupSize - (trip.requestUsers?.length || 0)} spot
                  {trip.maxGroupSize - (trip.requestUsers?.length || 0) !== 1 ? 's' : ''} left
                </span>
              </div>
            </div>
            
            <div className="trip-info">
              <h3 className="trip-destination">
                {/* <FaMapMarkerAlt className="icon" />  */} Title : {trip.title}
              </h3>
              <div className="trip-dates">
                <FaCalendarAlt className="icon" />
                <span>
                  {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="trip-host">
                <div className="host-avatar-placeholder">
                  {trip.hostedBy.charAt(0).toUpperCase()}
                </div>
                <span>Hosted by {trip.hostedBy}</span>
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
              style={{ backgroundImage: `url(https://indusringette.ca/cloud/IndusRingette/files/time-to-travel-wooden-sign-beach-background-49509295.jpg)` }} // Default image or use selectedTrip.image
            >
              <div className="modal-badge">
                <FaUserFriends className="badge-icon" />
                <span>
                  {selectedTrip.maxGroupSize - (selectedTrip.requestUsers?.length || 0)} spot
                  {selectedTrip.maxGroupSize - (selectedTrip.requestUsers?.length || 0) !== 1 ? 's' : ''} left 
                  (Group of {selectedTrip.maxGroupSize})
                </span>
              </div>
            </div>
            
            <div className="modal-content">
              <h2 className="modal-destination">
                <FaMapMarkerAlt className="icon" /> {selectedTrip.title}
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
                
                <h4>Interests</h4>
                <p>{selectedTrip.interests}</p>
                
                <h4>Trip Type</h4>
                <p>{selectedTrip.tripType}</p>
                
                <h4>Rules</h4>
                <p>{selectedTrip.rules}</p>
              </div>
              
              <button 
                className="join-button" 
                onClick={handleJoinRequest}
                disabled={selectedTrip.requestUsers?.includes(localStorage.getItem('email'))}
              >
                {selectedTrip.requestUsers?.includes(localStorage.getItem('email')) 
                  ? 'Request Pending' 
                  : 'Request to Join'}
              </button>
              
              <div className="modal-host">
                <div className="host-avatar-placeholder">
                  {selectedTrip.hostedBy.charAt(0).toUpperCase()}
                </div>
                <div className="host-info">
                  <h4>Hosted by {selectedTrip.hostedBy}</h4>
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