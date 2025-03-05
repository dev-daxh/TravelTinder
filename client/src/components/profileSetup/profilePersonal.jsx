import React, { useState } from "react";
import "./profilePer.css";

const ProfilePersonal = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
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

  const handleSubmit = () => {
    alert("Profile saved successfully!");
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
          <label>Full name*</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full name*"
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
          <label>Date of birth*</label>
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


