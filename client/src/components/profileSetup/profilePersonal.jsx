import React, { useState,useEffect } from "react";
import "./profilePer.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import TravelPreferencesForm from '../Prefrence/phoneAuth'; // import the new form
import TravelPreferencesFormV2 from "../Prefrence/travelperfrenceV2";

const ProfileSetup = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", dob: "", age:"",gender: "", bio: "",
    profilePicture: null, phone: "", aadharNumber: "", aadharFile: null,
    emergencyContacts: [
      { name: "", phone: "" }, // Emergency Contact 1
      { name: "", phone: "" }  // Emergency Contact 2
    ],
    travelPreferencesv1: {}, // This will store travel preferences,
    travelPreferencesv2: {} // This will store travel preferences

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
  
    // Check if the input field belongs to the emergency contacts
    if (name.includes("emergencyContact")) {
      const contactIndex = name.includes("1") ? 0 : 1; // Check if it's the first or second emergency contact field
      const field = name.includes("Name") ? "name" : "phone"; // Determine whether the field is for name or phone
  
      // Update the specific emergency contact
      const updatedEmergencyContacts = [...formData.emergencyContacts];
      updatedEmergencyContacts[contactIndex][field] = value;
  
      setFormData({
        ...formData,
        emergencyContacts: updatedEmergencyContacts,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const userEmail = formData.email; // Assuming you have user's email in state
    const fileExtension = file.name.split('.').pop(); // Get file extension
    const newFileName = `${userEmail}.${fileExtension}`; // Rename file
  
    const reader = new FileReader();
    reader.readAsDataURL(file); // Convert file to Base64
    reader.onloadend = async () => {
      const base64Image = reader.result;
      localStorage.setItem("profileImage", base64Image); // Store in localStorage
      setFormData((prevData) => ({ ...prevData, profilePicture: base64Image }));

      const formDataUpload = new FormData();
      formDataUpload.append("image", file, newFileName); // Upload with new filename
  
      // try {
      //   const response = await axios.post(
      //     "http://localhost:3001/api/user/upload-img",
      //     formDataUpload,
      //     { headers: { "Content-Type": "multipart/form-data" } }
      //   );
  
      //   if (response.status === 200) {
      //     const imageUrl = response.data.imageUrl; // Backend should return URL
      //     setFormData({ ...formData, profilePicture: imageUrl });
      //     toast.success("Image uploaded successfully!");
      //   } else {
      //     toast.error("Failed to upload image. Please try again.");
      //   }
      // } catch (error) {
      //   toast.error("Error uploading image.");
      //   console.error("Upload Error:", error);
      // }
    };
  };

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage && formData) {  // Ensure formData exists
      setFormData(prevData => ({ ...prevData, profilePicture: storedImage }));
    }
  }, []);
  
  
  

  const handleGenderSelect = (gender) => {
    setFormData({ ...formData, gender });
    updateProgress();
  };

  const updateProgress = () => {
    const filledFields = Object.values(formData).filter(val => val !== "" && val !== null).length;
    const totalFields = 15; 
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
  const validateForm = () => {
    const { firstName, lastName, dob, gender, bio, aadharNumber } = formData;
  
    // Check if all required fields are filled
    if (!firstName || !lastName || !dob || !gender || !bio || !aadharNumber) {
      toast.error("Please fill out all required fields.");
      return false;
    }
  
    return true;
  };
  
  const handleSubmit = async () => {
    const age = calculateAge(formData.dob);
    if (age < 18) {
      toast.error("You must be at least 18 years old to register.");
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      age: age  // Add the age field to the formData state
    }));
    
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }
    console.log(formData);
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
    updateProgress();
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
      <i className="user-icon"></i> // Default icon or placeholder
    )}
  </label>
  <input 
    id="profile-upload" 
    type="file" 
    accept="image/*" 
    style={{ display: 'none' }} 
    onChange={handleFileChange} 
  />
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
          onChange={handlePhoneChange}
          inputClass="phone-input"
          placeholder="Phone Number*"
        />
        <input 
          type="text" 
          name="aadharNumber" 
          placeholder="Aadhar Number*" 
          value={formData.aadharNumber} 
          onChange={handleInputChange} 
        />
        <p className="aadhar-p">Upload aadhar front page
          <a href="https://strapi-cdn.indmoney.com/cdn-cgi/image/quality=80,format=auto,metadata=copyright,width=700/https://strapi-cdn.indmoney.com/medium_aadhaar_card_0ae45bd73d.webp" target="_blank" rel="noopener noreferrer">
            (View Example)
          </a>
        </p>
        <input 
          type="file" 
          name="aadharFile" 
          placeholder="Upload aadhar front page" 
          onChange={handleFileChange} 
        />
        
        
        <h3>Emergency Contacts (Optional)</h3>
<input
  type="text"
  name="emergencyContact1Name"
  placeholder="Emergency Contact 1 Name"
  value={formData.emergencyContacts[0]?.name || ""}
  onChange={handleInputChange}
/>

<PhoneInput
          country={"in"}
          value={formData.emergencyContacts[0]?.phone||""}
          // onChange={handlePhoneChange}
          inputClass="phone-input"
          placeholder="Phone Number 1"
        />

<input
  type="text"
  name="emergencyContact2Name"
  placeholder="Emergency Contact 2 Name"
  value={formData.emergencyContacts[1]?.name || ""}
  onChange={handleInputChange}
/>
<PhoneInput
          country={"in"}
          value={formData.emergencyContacts[1]?.phone||""}
          // onChange={handlePhoneChange}
          inputClass="phone-input"
          placeholder="Phone Number 2"
        />

      </div>
      )}

      {step === 3 && (
        <div className="form-section">
          <h2>Travel Preferences</h2>
          <TravelPreferencesForm formData={formData} setFormData={setFormData} />
        </div>
      )}

      {step === 4 && (
        <div className="form-section">
          <h2>Travel Preferences</h2>
          {/* <input type="text" name="instagram" placeholder="Instagram" value={formData.instagram} onChange={handleInputChange} />
          <input type="text" name="facebook" placeholder="Facebook" value={formData.facebook} onChange={handleInputChange} />
          <input type="text" name="twitter" placeholder="Twitter" value={formData.twitter} onChange={handleInputChange} /> */}
         
          <TravelPreferencesFormV2 formData={formData} setFormData={setFormData} />
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

