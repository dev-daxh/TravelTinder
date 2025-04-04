import React, { useState } from 'react';
import './PostPage.css';
import { FaArrowLeft, FaCloudUploadAlt } from 'react-icons/fa'; // Upload icon
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useEffect } from 'react';
import { RingLoader } from 'react-spinners'; // Import RingLoader from react-spinners

const PostPage = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add a state for loading
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle image change and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload the image using your localhost API, store URL in localStorage and post to Firebase
  const handleUpload = async () => {
    if (!image) {
      alert('Please upload an image first!');
      return;
    }

    const imageName = image.name;  // Get the image name
    const email = localStorage.getItem('email');  // Get the email from localStorage or user state
    if (!email) { 
      alert('Email not found. Please log in again.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('email', email);  // Pass email from user state or context if needed

    try {
      setIsLoading(true); // Set loading state to true before starting the upload

      // Upload image to your localhost API
      const uploadResponse = await axios.post('http://localhost:3001/api/post/upload-img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Ensure the correct headers
        },
      });

      const imageUrl = uploadResponse.data.imageUrl;  // The Cloudinary image URL returned from your API
      
      console.log('Image URL from server:', imageUrl);

      // Check if the image URL is valid  
      if (!imageUrl) {
        alert('Failed to get image URL from server');
        setIsLoading(false); // Stop loading on error
        return;
      }

      // Store the image name in localStorage
      localStorage.setItem('PostUrl', imageUrl);

      // Store the image URL in localStorage
      console.log('Image URL:', imageUrl);
      console.log('Caption:', caption);

      // Call the Firebase API to store image URL and caption
      const firebaseResponse = await axios.post('http://localhost:3001/api/post/new-post', {
        email: email,  // Pass the email here (or get it from state/context)
        imageUrl: imageUrl,
        caption: caption,
      });

      alert('Post uploaded successfully!');
      console.log('Backend response:', firebaseResponse.data); // Correctly log the Firebase response

      navigate('/home'); // Navigate to the home page after successful upload
      setIsLoading(false); // Stop loading after successful upload

    } catch (error) {
      console.error('Error during upload or Firebase storage:', error);
      alert('Failed to upload the image');
      setIsLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="post-page">
      <header className="app-bar">
        <FaArrowLeft className="back-icon" />
        <h2>Create Post</h2>
      </header>
      <div className="upload-section">
        <label className="upload-btn">
          <FaCloudUploadAlt className="upload-icon" />
          <span className="upload-text">Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="upload-input"
          />
        </label>

        {imagePreview && (
          <div className="image-container">
            <img src={imagePreview} alt="Image preview" className="image-preview" />
          </div>
        )}

        {imagePreview && (
          <textarea
            className="caption-input"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        )}
      </div>

      {/* Conditionally render the loader while uploading */}
      {isLoading ? (
        <div className="loader-overlay">
          <RingLoader size={60} color="#36d7b7" loading={isLoading} />
        </div>
      ) : (
        <div className="post-btn-container">
          <button className="post-btn" onClick={handleUpload}>Post</button>
        </div>
      )}
    </div>
  );
};

export default PostPage;
