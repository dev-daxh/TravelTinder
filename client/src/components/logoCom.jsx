import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoCom.css'; // Import the CSS file

const LogoComponent = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/home');
  };

  return (
    <div className="logo-container-logo">
      <img 
        src="https://static.vecteezy.com/system/resources/previews/009/297/690/non_2x/india-travel-logo-vector.jpg" 
        alt="Company Logo" 
        className="logo-image-logo"
        onClick={handleLogoClick}
      />
    </div>
  );
};

export default LogoComponent;