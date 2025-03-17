import React, { useState, useEffect } from 'react';
import './profile.css';

const AdityaProfile = () => {

  const handelFollowAction = () => {
    const followButton = document.querySelector('.follow-button');
    const follower = document.querySelector('.stat-followers .stat-value');

    if (followButton.innerText === 'Follow') {
      followButton.innerText = 'Following';
      follower.innerText = parseInt(follower.innerText) + 1;

    } else {
      followButton.innerText = 'Follow';
      follower.innerText = parseInt(follower.innerText) - 1;

    }
  }
  return (
    <div className="aditya-profile">
      <header className="app-bar">
        {/* <button className="back-button" onClick={() => window.history.back()}>
          <i className="material-icons">arrow_back</i>
        </button>
        <h1 className="profile-title">Profile</h1> */}
      </header>

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-image-container">
            <img
              className="cover-image"
              src="https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Cover"
            />
            <div className="profile-avatar-container">
              <img
                className="profile-avatar"
                src="https://images.pexels.com/photos/15684227/pexels-photo-15684227/free-photo-of-man-with-mustache-standing-in-a-train-doorway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Profile Avatar"
              />
            </div>
          </div>
          <button className="follow-button" onClick={handelFollowAction}>Follow</button>
          <button className="chat-button" onClick={() => window.location.href = '/chat'}>Chat</button>
        </div>

        <div className="profile-info">
          <h2 className="name">Aditya K.</h2>

          <div className="stats-container">
            <div className="stat">
              <p className="stat-value">132</p>
              <p className="stat-label">trip's done</p>
            </div>
            <div className="stat-followers">
              <p className="stat-value">100</p>
              <p className="stat-label">Followers</p>
            </div>
            <div className="stat">
              <p className="stat-value">4.2</p>
              <p className="stat-label">rating</p>
            </div>
          </div>

          <div className="recent-trips">
            <div className="recent-trips-header">
              <h3>Recent trips</h3>
              <a href="/show-all" className="show-all-link">Show All</a>
            </div>
            <div className="trips-grid">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRzZQfMMPxOsgjPNgVIkqNeQ3Qlb0Clk65Dw&s" alt="Trip" />
              <img src="https://findyouradventure.in/wp-content/uploads/2022/09/259964698_747358246191714_6973046184021662842_n.jpg" alt="Trip" />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi6r76lAfoGfy9a3prmit0hLQHh7-JYP9TIL5FPkzP9R10N0QoAqX5GMCTYXPD0DRN6Po&usqp=CAU" alt="Trip" />
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRItm-fcLcGbfwdNasdrlPN3nERZzK4oMCcow&s' alt='Trip' />
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGPGQ2tU2Zh18xbPY3th58YQGXdSSKrdJsHQ&s' alt='Trip' />
              <img src='' alt='Fetch photos from api' />
              <img src='' alt='Fetch photos from api' />

              <img src='' alt='Fetch photos from api' />

              <img src='' alt='Fetch photos from api' />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdityaProfile;
