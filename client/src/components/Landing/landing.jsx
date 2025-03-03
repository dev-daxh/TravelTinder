import React, { useState, useEffect } from 'react';
import './landing.css'; // Import the CSS file for styles
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsImageLoaded(true);
    }, 100); // Mimic the animation delay
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    navigate('/auth-main', {
      state: { transition: 'fade' }, // Mimic the page transition (you can customize this as needed)
    });
  };

  return (
    <div className="landing-page" onClick={() => document.activeElement.blur()}>
      <div className="container">
        <div className="image-container">
          <img
            src="https://i.gifer.com/ICVb.gif"
            alt="Adventure Gif"
            className={`landing-image ${isImageLoaded ? 'fade-in' : ''}`}
          />
        </div>
        <h2 className="headline">Find Your next adventure Together</h2>
        <button className="get-started-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Landing;
