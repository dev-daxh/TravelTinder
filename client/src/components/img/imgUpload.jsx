import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = () => {
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !image) {
      setMessage('Please provide both email and an image.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:3001/api/user/upload-img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setMessage('File uploaded successfully');
        setFileUrl(response.data.imageUrl);
      } else {
        setMessage(response.data.error || 'Error uploading file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file');
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Choose an image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            required
          />
        </div>
        <div>
          <button type="submit">Upload</button>
        </div>
      </form>
      {message && <p>{message}</p>}
      {fileUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={fileUrl} alt="Uploaded" style={{ width: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
