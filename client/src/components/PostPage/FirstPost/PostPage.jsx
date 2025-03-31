import React, { useState } from 'react';
import './PostPage.css';
import { FaArrowLeft, FaCloudUploadAlt } from 'react-icons/fa'; // Upload icon
import axios from 'axios';

const PostPage = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Display the image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        // Convert to base64 and store in localStorage
        const base64Image = reader.result;
        localStorage.setItem('image', base64Image);
      };
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  const handleUpload = async () => {
    // Upload image to Cloudinary
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'your_cloudinary_upload_preset');
    console.log('Image:', image);
    console.log('Caption:', caption);
    alert('Post uploaded successfully!');
    // try {
    //   const response = await axios.post(
    //     'https://api.cloudinary.com/v1_1/your_cloudinary_cloud_name/image/upload',
    //     formData
    //   );
    //   // Save image URL and caption to storage or your database
    //   console.log('Uploaded Image URL:', response.data.secure_url);
    //   console.log('Caption:', caption);
    //   alert('Post uploaded successfully!');
    // } catch (error) {
    //   console.error('Error uploading image:', error);
    //   alert('Error uploading the image. Please try again.');
    // }
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
      <div className="post-btn-container">
        <button className="post-btn" onClick={handleUpload}>Post</button>
      </div>
    </div>
  );
};

export default PostPage;
