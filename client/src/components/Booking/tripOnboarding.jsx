import React, { useState } from 'react';
import './tripOn.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';  // Import ToastContainer and toast
import { Bounce } from 'react-toastify'; // Import Bounce transition

const TripOnboarding = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isPublic: true,
    maxGroupSize: 4,
    interests: '',
    rules: '',
    tripType: 'adventure',
    startDate: '',
    endDate: '',
    hostedBy: '',
    createdAt: '',
    status: 'open',  // default status as open
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the email from localStorage
    const email = localStorage.getItem('email');
    console.log('Email from localStorage:', email);  // Add this line to log the email
    // if (!email) {
    //     console.error('No email found in localStorage');
    //     return;
    // }

    // Add hostedBy and createdAt to the formData
    const updatedFormData = {
        ...formData,
        hostedBy: email,
        createdAt: new Date().toISOString(),
    };

    console.log('Form Data to Send:', updatedFormData);  // Add this line to log the data

    try {
      const response = await fetch('http://localhost:3001/api/explore/add-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tripData: updatedFormData, email: email }), // send tripData and email
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Trip created:', data);
        toast.success('Trip created successfully!', {
          position: "top-right",
          autoClose: 1700,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          onClose: () => {
            navigate('/explore');
          },
        });
      } else {
        console.error('Failed to create trip:', data.message);
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error creating trip:', error);
      alert('Something went wrong!');
    }
};

  return (
    <div className="onboarding-container">
      <h2>Create Your Trip</h2>
      <p className="subtitle">
        Fill in the details to create your perfect trip and find like-minded travelers to join you
      </p>

      <form onSubmit={handleSubmit} className="onboarding-form">
        <label>
          Trip Title*
          <input
            type="text"
            name="title"
            placeholder="e.g. Beach Adventure, Himalayan Trek"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description*
          <textarea
            name="description"
            placeholder="Tell potential travelers about your trip - places you'll visit, activities planned, etc."
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
          />
          <div className="char-count">{formData.description.length}/500</div>
        </label>

        <label>
          Trip Type
          <select
            name="tripType"
            value={formData.tripType}
            onChange={handleChange}
          >
            <option value="adventure">Adventure</option>
            <option value="relaxation">Relaxation</option>
            <option value="cultural">Cultural</option>
            <option value="roadtrip">Road Trip</option>
            <option value="backpacking">Backpacking</option>
          </select>
        </label>

        <div style={{ display: 'flex', gap: '15px' }}>
          <label style={{ flex: 1 }}>
            Start Date
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </label>
          <label style={{ flex: 1 }}>
            End Date
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={formData.startDate}
            />
          </label>
        </div>

        <label>
          Maximum Group Size
          <input
            type="number"
            name="maxGroupSize"
            value={formData.maxGroupSize}
            onChange={handleChange}
            min={2}
            max={20}
          />
        </label>

        <label>
          Shared Interests
          <input
            type="text"
            name="interests"
            placeholder="e.g. hiking, photography, local cuisine"
            value={formData.interests}
            onChange={handleChange}
          />
          <div className="char-count">Separate with commas</div>
        </label>

        <label>
          Group Rules
          <textarea
            name="rules"
            placeholder="Set expectations for your travel companions"
            value={formData.rules}
            onChange={handleChange}
            rows={3}
          />
          <div className="char-count">Separate with commas</div>
        </label>

        <button type="submit" className="submit-button">
          Create Trip
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default TripOnboarding;
