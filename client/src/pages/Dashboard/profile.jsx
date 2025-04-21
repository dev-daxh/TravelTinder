import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import "./profile.css";
import tripCombinations from "./done.json"; // Import the JSON directly
import { IoArrowBackCircle } from "react-icons/io5"; // Importing the icon
import { toast } from "react-toastify";

const Profile = () => {
  const [posts, setPosts] = useState([]); // State to store the posts
  const [loading, setLoading] = useState(true); // Loading state for fetching
  const [selectedPost, setSelectedPost] = useState(null); // State to store selected post for display
  const [userProfile, setUserProfile] = useState(null); // State to store user profile data
  const [stats, setStats] = useState(null); // State to store user stats (trips, followers, rating)

  useEffect(() => {
    // Get email from localStorage
    const email = localStorage.getItem("matchedUserEmail");

    if (email) {
      // Fetch user profile data
      axios
        .get(`http://localhost:3001/api/post/get-profile?email=${email}`)
        .then((response) => {
          setUserProfile(response.data.profile); // Store profile data in state

          // Check if there's a "followInfo" in localStorage
          let followInfo = localStorage.getItem("followInfo");

          if (!followInfo) {
            const randomKey = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
            localStorage.setItem("followInfo", randomKey); // Store selected key in localStorage
            followInfo = randomKey; // Use the randomly selected key
          }

          // Fetch the stats from the tripCombinations based on the key
          const userStats = tripCombinations[followInfo];
          setStats(userStats); // Set stats from the selected combination
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });

      // Fetch the posts data as well
      axios
        .get(`http://localhost:3001/api/post/get-post?email=${email}`)
        .then((response) => {
          const postsData = response.data.posts;

          if (Object.keys(postsData).length > 0) {
            const postsArray = Object.keys(postsData).map((key) => {
              const post = postsData[key];
              return {
                imageUrl: post.imgageUrl || post.imageUrl,
                caption: post.caption,
                timestamp: post.timestamp,
              };
            });
            setPosts(postsArray);
          } else {
            setPosts([]); // Empty posts array
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          setLoading(false);
        });
    } else {
      toast.error("No email found in localStorage");
      setLoading(false); // Stop loading if no email is found
    }
  }, []); // Run this effect only once when the component mounts

  const handleFollowAction = () => {
    const followButton = document.querySelector(".follow-button");
    const follower = document.querySelector(".stat-followers .stat-value");

    if (followButton.innerText === "Follow") {
      followButton.innerText = "Following";
      follower.innerText = parseInt(follower.innerText) + 1;
    } else {
      followButton.innerText = "Follow";
      follower.innerText = parseInt(follower.innerText) - 1;
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleClosePost = () => {
    setSelectedPost(null);
  };

  return (
    <div className="aditya-profile">
      <header className="app-bar">
        <button className="back-button" onClick={() => window.history.back()}>
          <IoArrowBackCircle size={30} />
        </button>
      </header>

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-image-container">
            {/* Show skeleton loader while loading */}
            {loading ? (
              <div className="skeleton skeleton-image"></div>
            ) : (
              <>
                <img
                  className="cover-image"
                  src="https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Cover"
                />
                <div className="profile-avatar-container">
                  <img
                    className="profile-avatar"
                    src={
                      userProfile?.profilePicture ||
                      "https://via.placeholder.com/150"
                    } // Display user's profile image or a fallback image
                    alt="Profile Avatar"
                  />
                </div>
              </>
            )}
          </div>
          {loading ? (
            <div
              className="skeleton skeleton-text"
              style={{ width: "200px", height: "30px", margin: "10px auto" }}
            ></div>
          ) : (
            <button className="follow-button" onClick={handleFollowAction}>
              Follow
            </button>
          )}
          {loading ? (
            <div
              className="skeleton skeleton-text"
              style={{ width: "100px", height: "30px", margin: "10px auto" }}
            ></div>
          ) : (
            <button
              className="chat-button"
              onClick={() => (window.location.href = "/chat")}
            >
              Chat
            </button>
          )}
        </div>

        <div className="profile-info">
          {loading ? (
            <>
              <div
                className="skeleton skeleton-text"
                style={{ width: "200px", height: "30px", margin: "10px auto" }}
              ></div>
              <div
                className="skeleton skeleton-text"
                style={{ width: "300px", height: "20px", margin: "10px auto" }}
              ></div>
            </>
          ) : (
            <>
              <h2 className="name">
                {userProfile?.firstName} {userProfile?.lastName}
              </h2>
              <p className="bio">{userProfile?.bio}</p>
            </>
          )}

          <div className="stats-container">
            {loading ? (
              <>
                <div className="skeleton skeleton-stat"></div>
                <div className="skeleton skeleton-stat"></div>
                <div className="skeleton skeleton-stat"></div>
              </>
            ) : (
              <>
                <div className="stat">
                  <p className="stat-value">{stats?.tripsDone}</p>{" "}
                  {/* Optional chaining added */}
                  <p className="stat-label">trip's done</p>
                </div>
                <div className="stat-followers">
                  <p className="stat-value">{stats?.followers}</p>{" "}
                  {/* Optional chaining added */}
                  <p className="stat-label">Followers</p>
                </div>
                <div className="stat">
                  <p className="stat-value">{stats?.rating}</p>{" "}
                  {/* Optional chaining added */}
                  <p className="stat-label">rating</p>
                </div>
              </>
            )}
          </div>

          <div className="recent-trips">
            <div className="recent-trips-header">
              <h3>Recent trips</h3>
              <a href="/FirstPost" className="show-all-link">
                Upload Post
              </a>
            </div>
            <div className="trips-grid-profile">
              {loading ? (
                <>
                  <div className="skeleton skeleton-post"></div>
                  <div className="skeleton skeleton-post"></div>
                  <div className="skeleton skeleton-post"></div>
                </>
              ) : posts.length > 0 ? (
                posts.map((post, index) => (
                  <div
                    key={index}
                    className="trip-item"
                    onClick={() => handlePostClick(post)}
                  >
                    <img src={post.imageUrl} alt={`Trip ${index}`} />
                  </div>
                ))
              ) : (
                <p>No posts found</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedPost && (
        <div className="post-overlay" onClick={handleClosePost}>
          <div className="post-content">
            <img
              className="post-image"
              src={selectedPost.imageUrl}
              alt="Selected Post"
            />
            <p className="post-caption">{selectedPost.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
