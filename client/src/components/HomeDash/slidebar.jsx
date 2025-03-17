import React, { useState } from 'react';
import './slidebar.css'; // Import the CSS file

const SideNav = () => {
  const [themeMode, setThemeMode] = useState('light'); // State for theme mode

  const handleThemeChange = (mode) => {
    setThemeMode(mode);
    // Add logic to apply the theme (e.g., updating a global theme context)
  };

  return (
    <div className="side-nav">
      <div className="nav-header">
        <div className="logo-container">
          <img
            src="/assets/images/Screenshot_2025-02-17_at_1.11.55_PM.png"
            alt="Logo"
            className="logo"
          />
        </div>
        <h1 className="app-name">Travel Tinder</h1>
      </div>

      <div className="user-profile">
        <div className="avatar-container">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRhkVcHSyTZ6mPbPFAj3aZVvBZeyaMJg-DtDnLNQidfsX9G07FD8YTfT8QdrTEAVz1gTM&usqp=CAU"
            alt="User Avatar"
            className="avatar"
          />
        </div>
        <div className="user-info">
          <p className="username">Andrew D.</p>
          <p className="user-email">admin@gmail.com</p>
        </div>
      </div>

      <div className="divider"></div>

      <div className="nav-links">
        <h3 className="section-title">Platform Navigation</h3>
        <div className="nav-item">
          <span className="icon">📊</span>
          <span className="link-text">Dashboard</span>
        </div>
        <div className="nav-item">
          <span className="icon">💬</span>
          <span className="link-text">Chats</span>
        </div>
        <div className="nav-item">
          <span className="icon">✈️</span>
          <span className="link-text">Bookings</span>
        </div>
        <div className="nav-item">
          <span className="icon">📜</span>
          <span className="link-text">Terms & Conditions</span>
        </div>

        <h3 className="section-title">Settings</h3>
        <div className="nav-item">
          <span className="icon">🔔</span>
          <span className="link-text">Notifications</span>
        </div>
        <div className="nav-item">
          <span className="icon">💳</span>
          <span className="link-text">Billing</span>
        </div>
        <div className="nav-item">
          <span className="icon">⚙️</span>
          <span className="link-text">Settings</span>
        </div>
      </div>

      <div className="theme-switcher">
        <div
          className={`theme-option ${themeMode === 'light' ? 'active' : ''}`}
          onClick={() => handleThemeChange('light')}
        >
          <span className="icon">☀️</span>
          <span className="theme-text">Light Mode</span>
        </div>
        <div
          className={`theme-option ${themeMode === 'dark' ? 'active' : ''}`}
          onClick={() => handleThemeChange('dark')}
        >
          <span className="icon">🌙</span>
          <span className="theme-text">Dark Mode</span>
        </div>
      </div>

      <div className="divider"></div>

      <div className="nav-footer">
        <span className="icon">---</span>
      </div>
    </div>
  );
};

export default SideNav;