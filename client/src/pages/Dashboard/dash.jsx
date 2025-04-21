import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./Sidebardata";
import "./dash.css";
import { IconContext } from "react-icons";
import { FaHeart, FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./loader"; // Import the Loader component
import { FaCircleUser } from "react-icons/fa6";
// API URL for fetching profiles and user preferences
const API_URL_PROFILES = "http://localhost:3001/api/home/getProfile";
const API_URL_CURRENT_USER_PREFS =
  "http://localhost:3001/api/home/getmatchdata";

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
  const [likeCount, setLikeCount] = useState(0);
  const [showMatchCelebration, setShowMatchCelebration] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // State to store user profile data
  useEffect(() => {
    // Get email from localStorage
    const email = localStorage.getItem("email");

    if (email) {
      // Fetch user profile data
      axios
        .get(`http://localhost:3001/api/post/get-profile?email=${email}`)
        .then((response) => {
          setUserProfile(response.data.profile); // Store profile data in state      
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    } else {
      setLoading(false); // Stop loading if no email is found
    }
  }, []); // Run this effect only once when the component mounts


  useEffect(() => {
    //localStorage.removeItem('matchedUserEmail'); // Clear the matched user email on component mount
  }, []);
  // Fetch profiles from the API on component mount
  useEffect(() => {
    const fetchCurrentUserPreferences = async () => {
      const email = localStorage.getItem("email");
      if (!email) {
        toast.error("No email found in localStorage");
        window.location.href = "/auth-main"; // Redirect to login if no email

        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.post(API_URL_CURRENT_USER_PREFS, {
          email,
        });
        setCurrentUserPrefs(response.data);
        console.log("Current user preferences:", response.data);
      } catch (error) {
        console.error("Error fetching current user preferences:", error);
        // toast.error('Failed to fetch current user preferences');
        setIsLoading(false);
      }
    };

    setIsLoading(true); // Set loading to true when starting to fetch
    axios
      .get(API_URL_PROFILES)
      .then((response) => {
        const fetchedProfiles = response.data.profiles;
        const profilesArray = Object.keys(fetchedProfiles).map((key) => {
          const profile = fetchedProfiles[key];
          return {
            name: `${profile.firstName} ${profile.lastName}`,
            age: new Date().getFullYear() - new Date(profile.dob).getFullYear(),
            bio: profile.bio,
            photo: profile.profilePicture,
            email: key,
            // this is prefrence of current login user who swpie other user
            travelPreferencesv1: profile.travelPreferencesv1,
            travelPreferencesv2: profile.travelPreferencesv2,
          };
        });
        const loggedInEmail = localStorage.getItem("email")?.replace(".", "_");

        const filteredProfiles = profilesArray.filter(
          (profile) => profile.email !== loggedInEmail
        );

        const shuffledProfiles = shuffleArray(filteredProfiles);
        setProfiles(shuffledProfiles);

        console.log("Filtered & shuffled profiles:", shuffledProfiles);

        fetchCurrentUserPreferences();
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
        toast.error("Failed to fetch profiles");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false when done
      });
  }, []);
  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  const saveMatchedEmail = (email) => {
    const existingMatches =
      JSON.parse(localStorage.getItem("matchedEmails")) || [];

    if (!existingMatches.includes(email)) {
      existingMatches.push(email);
      localStorage.setItem("matchedEmails", JSON.stringify(existingMatches));
      console.log("Matched emails updated:", existingMatches);
    }
  };

  // Match score calculation function
  // Match score calculation function
  // Match score calculation function
  const calculateMatchScore = (currentUser, profileUser) => {
    console.log("Current user prefs:", currentUser);
    console.log("Profile user prefs:", profileUser);

    if (!currentUser || !profileUser) {
      console.log("Missing user data for matching");
      return 0;
    }

    let score = 0;
    const maxPossibleScore = 100;

    // Extract preferences from nested structure
    const currentUserV1 = currentUser.travelPreferencesv1 || {};
    const currentUserV2 = currentUser.travelPreferencesv2 || {};
    const profileUserV1 = profileUser.travelPreferencesv1 || {};
    const profileUserV2 = profileUser.travelPreferencesv2 || {};

    // 1. Basic Compatibility (20%)
    score += matchBasicCompatibility(currentUserV2, profileUserV2);

    // 2. Travel Style & Preferences (30%)
    score += matchTravelPreferences(currentUserV1, profileUserV1);

    // 3. Communication & Social (20%)
    score += matchCommunicationStyle(currentUserV2, profileUserV2);

    // 4. Practical Factors (30%)
    score += matchPracticalFactors(currentUserV2, profileUserV2);

    // Normalize to percentage
    const finalScore = Math.min(
      Math.round((score / maxPossibleScore) * 100),
      100
    );
    console.log(`Match score calculation for ${profileUser.name}:`, {
      basic: matchBasicCompatibility(currentUserV2, profileUserV2),
      travel: matchTravelPreferences(currentUserV1, profileUserV1),
      communication: matchCommunicationStyle(currentUserV2, profileUserV2),
      practical: matchPracticalFactors(currentUserV2, profileUserV2),
      finalScore,
    });
    return finalScore;
  };

  // Updated Basic Compatibility function
  const matchBasicCompatibility = (currentPrefs, profilePrefs) => {
    let score = 0;

    // Age range compatibility
    if (currentPrefs.ageRange && profilePrefs.ageRange) {
      try {
        const currentAgeRange = Array.isArray(currentPrefs.ageRange)
          ? currentPrefs.ageRange[0].split("–").map(Number)
          : currentPrefs.ageRange.split("–").map(Number);

        const profileAgeRange = Array.isArray(profilePrefs.ageRange)
          ? profilePrefs.ageRange[0].split("–").map(Number)
          : profilePrefs.ageRange.split("–").map(Number);

        if (
          !(
            currentAgeRange[1] < profileAgeRange[0] ||
            currentAgeRange[0] > profileAgeRange[1]
          )
        ) {
          score += 5;
        }
      } catch (e) {
        console.log("Error parsing age range:", e);
      }
    }

    // Gender preference
    if (currentPrefs.genderPreference && profilePrefs.genderPreference) {
      // Handle both string and array formats
      const currentPref = Array.isArray(currentPrefs.genderPreference)
        ? currentPrefs.genderPreference[0]
        : currentPrefs.genderPreference;

      const profileGender = Array.isArray(profilePrefs.genderPreference)
        ? profilePrefs.genderPreference[0]
        : profilePrefs.genderPreference;

      if (currentPref && profileGender) {
        const cleanCurrent = currentPref.replace(/[^\w\s]/g, "").trim();
        const cleanProfile = profileGender.replace(/[^\w\s]/g, "").trim();

        if (
          cleanCurrent.includes(cleanProfile) ||
          cleanCurrent.includes("No Preference")
        ) {
          score += 5;
        }
      }
    }

    // Languages spoken
    if (currentPrefs.languagesSpoken && profilePrefs.languagesSpoken) {
      const currentLangs = Array.isArray(currentPrefs.languagesSpoken)
        ? currentPrefs.languagesSpoken
        : [currentPrefs.languagesSpoken];
      const profileLangs = Array.isArray(profilePrefs.languagesSpoken)
        ? profilePrefs.languagesSpoken
        : [profilePrefs.languagesSpoken];

      const commonLanguages = currentLangs.filter((lang) =>
        profileLangs.includes(lang)
      );
      if (commonLanguages.length > 0) {
        score += 5 + commonLanguages.length * 2; // Up to 10 points
      }
    }

    return Math.min(score, 20);
  };
  // Travel Style & Preferences (30 points)
  const matchTravelPreferences = (currentUser, profilePrefs) => {
    let score = 0;

    // Travel companion type
    if (currentUser.travelCompanion && profilePrefs.travelCompanion) {
      if (currentUser.travelCompanion === profilePrefs.travelCompanion) {
        score += 8;
      }
    }

    // Travel style
    if (currentUser.travelStyle && profilePrefs.travelStyle) {
      const commonStyles = currentUser.travelStyle.filter((style) =>
        profilePrefs.travelStyle.includes(style)
      );
      score += commonStyles.length * 4; // Up to 8 points (assuming 2 styles)
    }

    // Travel goals
    if (currentUser.travelGoals && profilePrefs.travelGoals) {
      const commonGoals = currentUser.travelGoals.filter((goal) =>
        profilePrefs.travelGoals.includes(goal)
      );
      score += commonGoals.length * 3; // Up to 9 points (assuming 3 goals)
    }

    // Trip budget
    if (currentUser.tripBudget && profilePrefs.tripBudget) {
      if (currentUser.tripBudget === profilePrefs.tripBudget) {
        score += 5;
      }
    }

    return Math.min(score, 30);
  };
  // Communication & Social (20 points)
  const matchCommunicationStyle = (currentUser, profilePrefs) => {
    let score = 0;

    // Communication style
    if (currentUser.communicationStyle && profilePrefs.communicationStyle) {
      if (currentUser.communicationStyle === profilePrefs.communicationStyle) {
        score += 10;
      } else {
        // Partial match (e.g., one prefers minimal, other is flexible)
        score += 5;
      }
    }

    // Experience level
    if (currentUser.experienceLevel && profilePrefs.experienceLevel) {
      if (currentUser.experienceLevel === profilePrefs.experienceLevel) {
        score += 5;
      }
    }

    // Smoker preference
    if (currentUser.smoker !== undefined && profilePrefs.smoker !== undefined) {
      if (currentUser.smoker === profilePrefs.smoker) {
        score += 5;
      }
    }

    return Math.min(score, 20);
  };
  // Practical Factors (30 points)
  const matchPracticalFactors = (currentUser, profilePrefs) => {
    let score = 0;

    // Availability
    if (currentUser.availability && profilePrefs.availability) {
      if (currentUser.availability === profilePrefs.availability) {
        score += 8;
      } else {
        // Check if both are available on weekends
        if (
          currentUser.availability.includes("Weekend") &&
          profilePrefs.availability.includes("Weekend")
        ) {
          score += 6;
        }
      }
    }

    // Preferred duration
    if (currentUser.preferredDuration && profilePrefs.preferredDuration) {
      if (currentUser.preferredDuration === profilePrefs.preferredDuration) {
        score += 7;
      }
    }

    // Transport preference
    if (currentUser.transport && profilePrefs.transport) {
      const commonTransport = currentUser.transport.filter((transport) =>
        profilePrefs.transport.includes(transport)
      );
      score += commonTransport.length * 5; // Up to 5 points
    }

    // Safety preferences
    if (currentUser.safetyPreferences && profilePrefs.safetyPreferences) {
      if (currentUser.safetyPreferences === profilePrefs.safetyPreferences) {
        score += 5;
      }
    }

    return Math.min(score, 30);
  };

  // Update your handleLike function
  const handleLike = () => {
    const newLikeCount = likeCount + 1;
    setLikeCount(newLikeCount);

    // Calculate actual match score
    const score = calculateMatchScore(currentUserPrefs, profiles[currentIndex]);

    setMatchScore(score);
    showMatchToast(score);
    goToNextProfile();
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

    if (Math.abs(diff) > 70) {
      setSwipeDirection(diff > 0 ? "right" : "left");
    } else {
      setSwipeDirection(null);
    }
  };

  const handleSwipeEnd = () => {
    if (swipeDirection === "right") {
      animateSwipe("right");
    } else if (swipeDirection === "left") {
      animateSwipe("left");
    }
    setSwipeDirection(null);
    setStartX(0);
  };

  const animateSwipe = (direction) => {
    setIsAnimating(true);
    setTimeout(() => {
      if (direction === "right") {
        handleLike();
      } else {
        handleDislike();
      }
      setIsAnimating(false);
    }, 300);
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
const addChat = async (email) => {
  try{
    const userEmail = localStorage.getItem("email");
    const response = await axios.post("http://localhost:3001/api/home/addchat", {
      email: userEmail,
      data:email,

    });
    console.log("Response from server:", response.data);

    if (response.status === 200) {
      console.log("Chat added successfully");
    } else {
      console.error("Failed to add chat");
    }
  }
  catch (error) {
    console.error("Error adding chat:", error);
  }
};
  const showMatchToast = (score) => {
    if (score >= 50) {
      setShowMatchCelebration(true); // Show the fancy match screen
      const userEmail = profiles[currentIndex].email;
      const email = userEmail.replace("_", "."); // Transform email to match Firebase path
      console.log("User email:", email);
      localStorage.setItem("matchedUserEmail", email); // Store the email in localStorage
      saveMatchedEmail(email); // ✅ Save this email in localStorage array
      addChat(email);
      setTimeout(() => {
        setShowMatchCelebration(false);
      }, 2500); // Hide after 2.5 seconds
      // how i can delay the redirection to profile page

      setTimeout(() => {
        window.location.href = "/profile-match";
      }, 2500); // 2.5 seconds

      //i wanna navigate to profile page of user
      // i have user's email in profiles[currentIndex].email
    } else {
      //toast.info("No match this time.");
      console.log("No match this time.");
      const userEmail = profiles[currentIndex].email;
      const email = userEmail.replace("_", "."); // Transform email to match Firebase path
      console.log("User email:", email);
    }
  };

  const currentProfile = profiles[currentIndex];

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <div className="dashboard">
        {/* Navbar */}
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>

        {/* Sidebar */}
        {/* Sidebar */}
<nav className={sidebar ? "nav-menu active" : "nav-menu"}>
  <ul className="nav-menu-items" onClick={showSidebar}>
    <li className="navbar-toggle">
      <Link to="#" className="menu-bars">
        <AiIcons.AiOutlineClose />
      </Link>
    </li>

    {/* Enhanced User Profile Section */}
    <li className="user-profile-section">
      <div className="user-profile-container">
        {userProfile ? (
        
          <div className="user-profile">
              <Link to="/profile-user">
          <div
            className="user-avatar"
            style={{ backgroundImage: `url(${userProfile?.profilePicture})` }}
          />
        </Link>
            
            <div className="user-info">
              <span className="user-name">
                {userProfile?.firstName} {userProfile?.lastName}
              </span>
              
              <Link to="/auth-main" className="logout-btn">
                <FaIcons.FaSignOutAlt />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="user-profile">
            <div className="user-avatar default-avatar">
              <FaCircleUser />
            </div>
            <div className="user-info">
              <span className="user-name">Loading...</span>
            </div>
          </div>
        )}
      </div>
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
        <div className={`content ${sidebar ? "blurred" : ""}`}>
          <div className="cards-container">
            {currentProfile && (
              <div
                className={`card ${
                  swipeDirection ? `swipe-${swipeDirection}` : ""
                } ${isAnimating ? `animate-${swipeDirection}` : ""}`}
                onTouchStart={handleSwipeStart}
                onTouchMove={handleSwipeMove}
                onTouchEnd={handleSwipeEnd}
                onMouseDown={handleSwipeStart}
                onMouseMove={handleSwipeMove}
                onMouseUp={handleSwipeEnd}
                onMouseLeave={handleSwipeEnd}
              >
                <div
                  className="card-image"
                  style={{ backgroundImage: `url(${currentProfile.photo})` }}
                >
                  <div className="card-overlay">
                    <div className="card-info">
                      <h2>
                        {currentProfile.name}, {currentProfile.age}
                      </h2>
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
              onClick={() => animateSwipe("left")}
              disabled={isAnimating}
            >
              <FaTimes size={24} />
            </button>
            <button
              className="like-btn"
              onClick={() => animateSwipe("right")}
              disabled={isAnimating}
            >
              <FaHeart size={24} />
            </button>
          </div>
        </div>
        {showMatchCelebration && (
          <div className="match-overlay">
            <div className="match-message">
              🎉 It's a Match! 🎉
              <br />
              You're awesome together!
              <br />
              Match Score: {matchScore}%
              <br />
              Go to Chats for more details!
            </div>
          </div>
        )}

        {/* Toast Container for showing toast messages */}
        <ToastContainer />

        {/* Loader Component */}
        {isLoading && <Loader message="Fetching profiles and preferences..." />}
      </div>
    </IconContext.Provider>
  );
};

export default Dashboard;
