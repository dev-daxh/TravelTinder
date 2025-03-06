import React, { useState } from "react";
import "./profilePer.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ProfileSetup = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", dob: "", gender: "", bio: "",
    profilePicture: null, phone: "", email: "", aadharNumber: "", aadharFile: null,
    emergencyContact: "", country: "", city: "", languages: "",
    travelInterests: "", lookingFor: "", instagram: "", facebook: "", twitter: ""
  });

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    updateProgress();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
        updateProgress();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenderSelect = (gender) => {
    setFormData({ ...formData, gender });
    updateProgress();
  };

  const updateProgress = () => {
    const filledFields = Object.values(formData).filter(val => val !== "" && val !== null).length;
    const totalFields = 15; // Updated field count
    const newProgress = Math.round((filledFields / totalFields) * 100);
    setProgress(newProgress);
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
      setProgress(progress + 25);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setProgress(progress - 25);
    }
  };

  const handleSubmit = async () => {
    const age = calculateAge(formData.dob);
    if (age < 18) {
      toast.error("You must be at least 18 years old to register.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3001/api/user/create-user", formData);
      if (response.status === 201) {
        toast.success("Profile created successfully!");
      }
    } catch (error) {
      toast.error("Error saving profile. Please try again.");
    }
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
    updateProgress(); // Ensure progress is updated when phone number changes
  };

  return (
    <div className="profile-container">
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <h1>Profile Setup</h1>
      <p className="subtitle">Step {step} of 4</p>
      <div className="avatar-container">
        <label htmlFor="profile-upload" className="avatar">
          {formData.profilePicture ? (
            <img src={formData.profilePicture} alt="Profile" className="profile-image" />
          ) : (
            <i className="user-icon"></i>
          )}
        </label>
        <input id="profile-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
      </div>

      {step === 1 && (
        <div className="form-section">
          <h2>Personal Information</h2>
          <input type="text" name="firstName" placeholder="First Name*" value={formData.firstName} onChange={handleInputChange} />
          <input type="text" name="lastName" placeholder="Last Name*" value={formData.lastName} onChange={handleInputChange} />
          <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
          <div className="gender-options">
            {["Male", "Female", "Other"].map(gender => (
              <button key={gender} className={`gender-btn ${formData.gender === gender ? "selected" : ""}`} onClick={() => handleGenderSelect(gender)}>
                {gender}
              </button>
            ))}
          </div>
          <textarea name="bio" placeholder="Tell us about yourself..." value={formData.bio} onChange={handleInputChange}></textarea>
        </div>
      )}

      {step === 2 && (
        <div className="form-section">
          <h2>Identity Verification</h2>
          <PhoneInput
            country={"in"}
            value={formData.phone}
            onChange={handlePhoneChange} // Handle phone change
            inputClass="phone-input"
            placeholder="Phone Number*"
          />
          <input type="email" name="email" placeholder="Email (Optional)" value={formData.email} onChange={handleInputChange} />
          <input type="text" name="aadharNumber" placeholder="Aadhar Number*" value={formData.aadharNumber} onChange={handleInputChange} />
          <input type="file" name="aadharFile" onChange={handleFileChange} />
          <input type="text" name="emergencyContact" placeholder="Emergency Contact (Optional)" value={formData.emergencyContact} onChange={handleInputChange} />
        </div>
      )}

      {step === 3 && (
        <div className="form-section">
          <h2>Travel Preferences</h2>
          <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleInputChange} />
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} />
          <input type="text" name="languages" placeholder="Languages Spoken" value={formData.languages} onChange={handleInputChange} />
          <input type="text" name="travelInterests" placeholder="Travel Interests" value={formData.travelInterests} onChange={handleInputChange} />
          <input type="text" name="lookingFor" placeholder="Looking For (Travel Buddies, etc.)" value={formData.lookingFor} onChange={handleInputChange} />
        </div>
      )}

      {step === 4 && (
        <div className="form-section">
          <h2>Social Links</h2>
          <input type="text" name="instagram" placeholder="Instagram" value={formData.instagram} onChange={handleInputChange} />
          <input type="text" name="facebook" placeholder="Facebook" value={formData.facebook} onChange={handleInputChange} />
          <input type="text" name="twitter" placeholder="Twitter" value={formData.twitter} onChange={handleInputChange} />
        </div>
      )}

      <div className="navigation-buttons">
        {step > 1 && <button onClick={prevStep}>Back</button>}
        {step < 4 ? <button onClick={nextStep}>Next</button> : <button onClick={handleSubmit}>Submit</button>}
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProfileSetup;
