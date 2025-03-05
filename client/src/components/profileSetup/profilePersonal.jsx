import React, { useState } from "react";
import "./profilePer.css";
import axios from "axios";
import {toast} from "react-toastify";


const ProfilePersonal = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    dob: "",
    gender: "",
    bio: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setFormData({ ...formData, gender });
  };

  const handleSubmit = async() => {
    alert("Profile saved successfully!");
    // You can also log formData to see the final structure
    // Validating if the form data is valid before sending the request
    if (!formData.firstName || !formData.lastName || !formData.age || !formData.dob || !formData.gender) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/user/create-user", formData);
      
      // If the user creation is successful, show a success toast
      if (response.status === 201) {
        toast.success("Profile saved successfully!");
        console.log(response.data);  // Log the response data if needed
      }
    } catch (error) {
      // Handle any errors that occur during the API call
      toast.error("Error saving profile. Please try again.");
      console.error("Error: ", error.message);
    }

    console.log(formData);
  }; 

  return (
    <div className="profile-container">
      <h1>Profile Setup</h1>
      <p className="subtitle">Please fill in the information below to continue.</p>

      <div className="profile-content">
        <div className="avatar">
          <i className="user-icon"></i>
        </div>

        <div className="form-group">
          <label>First Name*</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="First Name*"
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name*</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Last Name*"
            required
          />
        </div>

        <div className="form-group">
          <label>Age*</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Age*"
            required
          />
        </div>

        <div className="form-group">
          <label>Date of Birth*</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="gender-options">
            {["Female", "Male", "Other"].map((gender) => (
              <button
                key={gender}
                className={`gender-btn ${selectedGender === gender ? "selected" : ""}`}
                onClick={() => handleGenderSelect(gender)}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Please describe yourself.... (bio)"
          ></textarea>
        </div>

        <button className="save-btn" onClick={handleSubmit}>
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePersonal;
