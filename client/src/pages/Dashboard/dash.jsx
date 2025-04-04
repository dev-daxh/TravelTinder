import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './Sidebardata';
import './dash.css';
import { IconContext } from 'react-icons';
import { FaHeart, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './loader'; // Import the Loader component

// API URL for fetching profiles and user preferences
const API_URL_PROFILES = 'http://localhost:3001/api/home/getProfile';
const API_URL_CURRENT_USER_PREFS = 'http://localhost:3001/api/home/getmatchdata';

const Dashboard = () => {
  const [sidebar, setSidebar] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [startX, setStartX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentUserPrefs, setCurrentUserPrefs] = useState(null);
  const [matchScore, setMatchScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Add this with your other states

  // Fetch profiles from the API on component mount
  useEffect(() => {
    const fetchCurrentUserPreferences = async () => {
      const email = localStorage.getItem('email');
      if (!email) {
        console.error('No email found in localStorage.');
        toast.error('No email found in localStorage');
        setIsLoading(false); 
        return;
      }

      try {
        const response = await axios.post(API_URL_CURRENT_USER_PREFS, { email });
        setCurrentUserPrefs(response.data);
      } catch (error) {
        console.error('Error fetching current user preferences:', error);
        toast.error('Failed to fetch current user preferences');
        setIsLoading(false); 
      }
    };

    setIsLoading(true); // Set loading to true when starting to fetch
    axios.get(API_URL_PROFILES)
      .then((response) => {
        const fetchedProfiles = response.data.profiles;
        const profilesArray = Object.keys(fetchedProfiles).map((key) => {
          const profile = fetchedProfiles[key];
          return {
            name: `${profile.firstName} ${profile.lastName}`,
            age: new Date().getFullYear() - new Date(profile.dob).getFullYear(),
            bio: profile.bio,
            photo: profile.profilePicture,
            email: key
          };
        });
        setProfiles(profilesArray);
        fetchCurrentUserPreferences();
      })
      .catch((error) => {
        console.error('Error fetching profiles:', error);
        toast.error('Failed to fetch profiles');
        setIsLoading(false); 
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false when done
      });
  }, []);

  // Match score calculation function
  const calculateMatchScore = (currentUser, profile) => {
    let score = 0;
    // ... your match score calculation logic here ...
    return score;
  };

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleSwipeStart = (e) => {
    setStartX(e.touches ? e.touches[0].clientX : e.clientX);
    setIsAnimating(false);
  };

  const handleSwipeMove = (e) => {
    if (!startX) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX;

    if (Math.abs(diff) > 50) {
      setSwipeDirection(diff > 0 ? 'right' : 'left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleSwipeEnd = () => {
    if (swipeDirection === 'right') {
      animateSwipe('right');
    } else if (swipeDirection === 'left') {
      animateSwipe('left');
    }
    setSwipeDirection(null);
    setStartX(0);
  };

  const animateSwipe = (direction) => {
    setIsAnimating(true);
    setTimeout(() => {
      if (direction === 'right') {
        handleLike();
      } else {
        handleDislike();
      }
      setIsAnimating(false);
    }, 300);
  };

  const handleLike = () => {
    const score = calculateMatchScore(currentUserPrefs, profiles[currentIndex]);
    setMatchScore(score);
    showMatchToast(score);
    goToNextProfile();
  };

  const handleDislike = () => {
    goToNextProfile();
  };

  const goToNextProfile = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      toast.info("No more profiles to show! Refreshing...");
      setTimeout(() => {
        window.location.reload(); 
      }, 1500); 
    }
  };

  const showMatchToast = (score) => {
    if (score >= 75) {
      toast.success("It's a match! 🎉");
    } else {
      toast.info("No match this time.");
    }
  };

  const currentProfile = profiles[currentIndex];

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className='dashboard'>
        {/* Navbar */}
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>

        {/* Sidebar */}
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            {SidebarData.map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main content area */}
        <div className={`content ${sidebar ? 'blurred' : ''}`}>
          <div className="cards-container">
            {currentProfile && (
              <div
                className={`card ${swipeDirection ? `swipe-${swipeDirection}` : ''} ${isAnimating ? `animate-${swipeDirection}` : ''}`}
                onTouchStart={handleSwipeStart}
                onTouchMove={handleSwipeMove}
                onTouchEnd={handleSwipeEnd}
                onMouseDown={handleSwipeStart}
                onMouseMove={handleSwipeMove}
                onMouseUp={handleSwipeEnd}
                onMouseLeave={handleSwipeEnd}
              >
                <div className="card-image" style={{ backgroundImage: `url(${currentProfile.photo})` }}>
                  <div className="card-overlay">
                    <div className="card-info">
                      <h2>{currentProfile.name}, {currentProfile.age}</h2>
                      <p>{currentProfile.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentIndex >= profiles.length - 1 && (
              <div className="no-more-profiles">
                <p>No more profiles to show</p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="action-buttons">
            <button
              className="dislike-btn"
              onClick={() => animateSwipe('left')}
              disabled={isAnimating}
            >
              <FaTimes size={24} />
            </button>
            <button
              className="like-btn"
              onClick={() => animateSwipe('right')}
              disabled={isAnimating}
            >
              <FaHeart size={24} />
            </button>
          </div>
        </div>

        {/* Toast Container for showing toast messages */}
        <ToastContainer />

        {/* Loader Component */}
        {isLoading && <Loader message="Fetching profiles and preferences..." />}
      </div>
    </IconContext.Provider>
  );
}

export default Dashboard;
