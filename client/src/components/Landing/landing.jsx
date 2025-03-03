import React, { useState, useEffect } from 'react';
import './landing.css'; // Import the CSS file for styles
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true); // State to control button visibility
  const navigate = useNavigate();

  useEffect(() => {
    // Mimic image load animation
    const imageTimer = setTimeout(() => {
      setIsImageLoaded(true);
    }, 100); // Animation delay for image

    // Navigate after 3 seconds and remove the button
    const navigateTimer = setTimeout(() => {
      setIsButtonVisible(false); // Hide the button
      navigate('/auth-main', {
        state: { transition: 'fade' }, // Mimic the page transition
      });
    }, 3000); // 3 seconds to wait before navigation

    // Clean up timers when the component unmounts
    return () => {
      clearTimeout(imageTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

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

        {/* Conditionally render the button */}
        {isButtonVisible && (
          <button className="get-started-button" onClick={() => {}}>
            Get Started
          </button>
        )}
      </div>
    </div>
  );
};

export default Landing;
