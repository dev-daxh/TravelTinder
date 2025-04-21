import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profileUser.css";
import tripCombinations from "./done.json";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import Loader from "../loader"; // Make sure this path is correct

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");

    // Check localStorage for saved profile picture first
    const savedProfilePic = localStorage.getItem("profilePicture");
    if (savedProfilePic) {
      setPreviewImage(savedProfilePic);
    }

    if (email) {
      fetchUserProfile(email);
      fetchUserPosts(email);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = (email) => {
    axios
      .get(`http://localhost:3001/api/post/get-profile?email=${email}`)
      .then((response) => {
        setUserProfile(response.data.profile);
        // Only set preview image if not already set from localStorage
        if (!previewImage) {
          setPreviewImage(response.data.profile?.profilePicture || null);
        }

        let followInfo = localStorage.getItem("followInfo");
        if (!followInfo) {
          const randomKey = Math.floor(Math.random() * 10) + 1;
          localStorage.setItem("followInfo", randomKey);
          followInfo = randomKey;
        }

        const userStats = tripCombinations[followInfo];
        setStats(userStats);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  const fetchUserPosts = (email) => {
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
          setPosts([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }
  
    const email = localStorage.getItem("email");
    if (!email) {
      alert("User email not found. Please log in again.");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("email", email);
  
    try {
      setUploading(true); // Start loader
  
      const response = await axios.post("http://localhost:3001/api/post/upload-img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      const uploadedImageUrl = response.data.imageUrl;
      if (!uploadedImageUrl) {
        alert("Upload failed. No image URL returned.");
        return;
      }
  
      localStorage.setItem("profilePicture", uploadedImageUrl);
      setPreviewImage(uploadedImageUrl);
  
      await axios.post("http://localhost:3001/api/user/update-img", {
        email,
        profileUrl: uploadedImageUrl,
      });
  
      alert("Profile picture updated successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Something went wrong while uploading. Please try again.");
    } finally {
      setUploading(false); // Stop loader
      setShowImageModal(false);
      setSelectedImage(null);
    }
  };
  
  

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
                      previewImage ||
                      userProfile?.profilePicture ||
                      "https://via.placeholder.com/150"
                    }
                    alt="Profile Avatar"
                  />
                  <div
                    className="camera-icon-container"
                    onClick={() => setShowImageModal(true)}
                  >
                    <FaCamera className="camera-icon" />
                  </div>
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
                  <p className="stat-value">{stats?.tripsDone}</p>
                  <p className="stat-label">trip's done</p>
                </div>
                <div className="stat-followers">
                  <p className="stat-value">{stats?.followers}</p>
                  <p className="stat-label">Followers</p>
                </div>
                <div className="stat">
                  <p className="stat-value">{stats?.rating}</p>
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
                <p className="no-posts">No posts found</p>
              )}
            </div>
          </div>
        </div>

        {/* Image Upload Modal */}
        {showImageModal && (
          <div className="modal-overlay-profile" onClick={() => setShowImageModal(false)}>
            <div
              className="image-upload-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Update Profile Picture</h3>
                <button
                  className="close-modal"
                  onClick={() => setShowImageModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
  {uploading ? (
    <div className="loader-center">
      <Loader />
      <p>Uploading...</p>
    </div>
  ) : (
    <>
      <div className="image-preview-container">
        {previewImage ? (
          <img
            src={previewImage}
            alt="Current Profile"
            className="image-preview"
          />
        ) : (
          <div className="empty-preview">
            <FaCamera size={48} />
            <p>No image selected</p>
          </div>
        )}
      </div>
      <label className="upload-btn">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        Choose Image
      </label>
    </>
  )}
</div>

              <div className="modal-footer">
                <button
                  className="cancel-btn"
                  onClick={() => setShowImageModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="upload-btn-primary"
                  onClick={handleUpload}
                  disabled={!selectedImage}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}

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
    </div>
  );
};

export default Profile;