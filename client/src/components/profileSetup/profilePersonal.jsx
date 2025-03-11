import React, { useState,useEffect } from "react";
import "./profilePer.css";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import TravelPreferencesForm from '../Prefrence/phoneAuth'; // import the new form
import TravelPreferencesFormV2 from "../Prefrence/travelperfrenceV2";
import { ToastContainer, toast } from 'react-toastify';  // Import ToastContainer and toast
import { Bounce } from 'react-toastify'; // Import Bounce transition
import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "",email:"", dob: "", age:"",gender: "", bio: "",
    profilePicture: null, phone: "", aadharNumber: "", aadharFile: null,
    emergencyContacts: [{ name: "", phone: "" }, // Emergency Contact 1
      { name: "", phone: "" } ], // Emergency Contact 2] ,// Initialize with one emergency contact
    travelPreferencesv1: {}, // This will store travel preferences,
    travelPreferencesv2: {} // This will store travel preferences

  });
    const navigate = useNavigate();
  
  
// Retrieve the email from localStorage
useEffect(() => {
  const userEmail = localStorage.getItem('email');

  if (!userEmail) {
    toast.error('Authentication failed! No email found.', {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,  // Use the Bounce transition here
      onClose: () => navigate('/auth-main'),  // Navigate after the toast closes
    });
  } else {
    console.log('User email:', userEmail);  // Optionally log the email
    setFormData((prevData) => ({
      ...prevData,
      email: userEmail
    }));  }
}, []); // Empty dependency array ensures this runs once on component mount
useEffect(() => {
  const handleBeforeUnload = (event) => {
    // Here you can check if the user is filling out the form
    // If they are, clear the localStorage (in this case it clears always on unload)
    localStorage.clear();
    console.log('LocalStorage cleared on page unload');
    
    // Optional: You can also display a warning message to prevent unsaved changes
    event.returnValue = 'Are you sure you want to leave?'; // Standard warning
  };

  // Add event listener to handle page unload
  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => {
    // Cleanup event listener when the component unmounts
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}, []);
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
  

  //handel img 
  const handleProfileImageUploadToLocal = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Convert file to Base64
    reader.onloadend = () => {
      const base64Image = reader.result;
      localStorage.setItem("profileImage", base64Image); // Store in localStorage
      setFormData((prevData) => ({ ...prevData, profilePicture: base64Image }));
    };
  };
  
  const handleProfileImageUploadApi = async (file, userEmail) => {
    const fileExtension = file.name.split('.').pop(); // Get file extension
    const newFileName = `${userEmail}_profile.${fileExtension}`; // Renaming file for uniqueness
  
    const formDataUpload = new FormData();
    formDataUpload.append("image", file, newFileName); // Upload with new filename
  
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/upload-profile",
        formDataUpload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      if (response.status === 200) {
        const imageUrl = response.data.imageUrl; // Backend should return URL
        // Update formData with the URL of the profile image
        setFormData((prevData) => ({ ...prevData, profilePicture: imageUrl }));
        toast.success("Profile image uploaded successfully!");
      } else {
        toast.error("Failed to upload profile image. Please try again.");
      }
    } catch (error) {
      toast.error("Error uploading profile image.");
      console.error("Upload Error:", error);
    }
};

  
  const handleAadharImageUploadToLocal = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Convert file to Base64
    reader.onloadend = () => {
      const base64Image = reader.result;
      localStorage.setItem("aadharImage", base64Image); // Store in localStorage
      setFormData((prevData) => ({ ...prevData, aadharFile: base64Image }));
    };
  };
  
  const handleAadharImageUploadApi = async (file, userEmail) => {
    const fileExtension = file.name.split('.').pop(); // Get file extension
    const newFileName = `${userEmail}_aadhar_${Date.now()}.${fileExtension}`; // Renaming file for uniqueness
  
    const formDataUpload = new FormData();
    formDataUpload.append("image", file, newFileName); // Upload with new filename
  
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/upload-aadhar",
        formDataUpload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      if (response.status === 200) {
        const imageUrl = response.data.imageUrl; // Backend should return URL
        // Update formData with the URL of the Aadhar image
        setFormData((prevData) => ({ ...prevData, aadharFile: imageUrl }));
        toast.success("Aadhar image uploaded successfully!");
      } else {
        toast.error("Failed to upload Aadhar image. Please try again.");
      }
    } catch (error) {
      toast.error("Error uploading Aadhar image.");
      console.error("Upload Error:", error);
    }
};

  
  // Function to handle profile image upload
  const handleProfileFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    // Check file size (1 MB limit)
    const MAX_SIZE = 1 * 1024 * 1024; // 1MB in bytes
    if (file.size > MAX_SIZE) {
      toast.error("File size exceeds 1 MB. Please upload a smaller image.");
      return;
    }
  
    const userEmail = formData.email; // Assuming you have user's email in state
  
    // Handle profile image local storage and API upload
    handleProfileImageUploadToLocal(file);
    await handleProfileImageUploadApi(file, userEmail);  // Call API for Profile Image Upload
  };
  
  // Function to handle Aadhar image upload
  const handleAadharFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Check file size (1 MB limit)
  const MAX_SIZE = 1 * 1024 * 1024; // 1MB in bytes
  if (file.size > MAX_SIZE) {
    toast.error("Aadhar image size exceeds 1 MB. Please upload a smaller image.");
    return;
  }

  const userEmail = formData.email; // Assuming you have user's email in state

  // Handle Aadhar image local storage and API upload
  handleAadharImageUploadToLocal(file);
  await handleAadharImageUploadApi(file, userEmail);  // Call API for Aadhar Image Upload
};
  
  



  const handleAadharChange = (e) => {
    const { name, value } = e.target;

    // Only allow digits and limit to 12 characters
    if (/^\d{0,12}$/.test(value)) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  // const handleFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  
  //   const userEmail = formData.email; // Assuming you have user's email in state
  //   const fileExtension = file.name.split('.').pop(); // Get file extension
  //   const newFileName = `${userEmail}.${fileExtension}`; // Rename file
  
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file); // Convert file to Base64
  //   reader.onloadend = async () => {
  //     const base64Image = reader.result;
  //     localStorage.setItem("profileImage", base64Image); // Store in localStorage
  //     setFormData((prevData) => ({ ...prevData, profilePicture: base64Image }));

  //     const formDataUpload = new FormData();
  //     formDataUpload.append("image", file, newFileName); // Upload with new filename
  
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:3001/api/user/upload-img",
  //         formDataUpload,
  //         { headers: { "Content-Type": "multipart/form-data" } }
  //       );
  
  //       if (response.status === 200) {
  //         const imageUrl = response.data.imageUrl; // Backend should return URL
  //         setFormData({ ...formData, profilePicture: imageUrl });
  //         toast.success("Image uploaded successfully!");
  //       } else {
  //         toast.error("Failed to upload image. Please try again.");
  //       }
  //     } catch (error) {
  //       toast.error("Error uploading image.");
  //       console.error("Upload Error:", error);
  //     }
  //   };
  // };

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
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(val => val && val !== "").length;
    const newProgress = totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
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
  const handleSubmit = async (e) => {
    
    // Calculate the age from the date of birth
    const age = calculateAge(formData.dob);
    if (age < 18) {
      toast.error("You must be at least 18 years old to register.");
      return;
    }
  
    // Update the age field in formData
    setFormData((prevData) => ({
      ...prevData,
      age: age,
    }));
  
    // Validate the form before submission
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }
  
    // Check if the profile picture is uploaded
    if (!formData.profilePicture) {
      toast.error("Please upload a profile picture.");
      return;
    }
  
    // Check if the Aadhar image is uploaded
    if (!formData.aadharFile) {
      toast.error("Please upload your Aadhar image.");
      return;
    }
    console.log("emergencyContacts:", formData.emergencyContacts); // Log emergencyContacts to check its value
    if (formData.emergencyContacts && formData.emergencyContacts[0]) {
      console.log("First contact:", formData.emergencyContacts[0]);
      console.log("First contact name:", formData.emergencyContacts[0].name);
    } else {
      console.log("Emergency contacts are undefined or empty.");
    }
    console.log("Form Data before submission:", formData);
    // If both images are available, proceed with the image upload API calls
    try {
      const userEmail = formData.email; // Get the email from formData
      // At this point, the image URLs have been set in formData, so now we can proceed to create the user
  
      console.log("Form Data before submission:", formData);
  
      // Make the API call to create the user
      const response = await axios.post("http://localhost:3001/api/user/create-user", formData);
  
      if (response.status === 201) {
        toast.success("Profile created successfully!");
        // Optionally, reset the form data or redirect the user after successful submission
      }
    } catch (error) {
      toast.error("Error saving profile. Please try again.");
      console.error("Error during profile creation:", error);
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
    onChange={handleProfileFileChange} 
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
       <div>
      <input
        type="text"
        name="aadharNumber"
        placeholder="Aadhar Number*"
        value={formData.aadharNumber}
        onChange={handleAadharChange}
      />
      {/* Aadhar number should be exactly 12 digits */}
      {formData.aadharNumber.length !== 12 && formData.aadharNumber !== "" && (
        <p style={{ color: "red" }}>Aadhar number must be exactly 12 digits.</p>
      )}
    </div>
        <p className="aadhar-p">Upload aadhar front page
          <a href="https://strapi-cdn.indmoney.com/cdn-cgi/image/quality=80,format=auto,metadata=copyright,width=700/https://strapi-cdn.indmoney.com/medium_aadhaar_card_0ae45bd73d.webp" target="_blank" rel="noopener noreferrer">
            (View Example)
          </a>
        </p>
        <input 
      type="file" 
      name="aadharFile" 
      placeholder="Upload Aadhar Front Page" 
      onChange={handleAadharFileChange} 
    />
    
   {/* Show Aadhar image if uploaded */}
{formData.aadharFile && (
  <div>
    <p>Aadhar Image Uploaded:</p>
    {/* Link that opens the image in a new tab */}
    <a href={formData.aadharFile} target="_blank" rel="noopener noreferrer">
      {/* Display the image in a smaller preview */}
      <img
        src={formData.aadharFile}
        alt="Uploaded Aadhar"
        style={{ maxWidth: '200px', maxHeight: '150px', cursor: 'pointer' }}
      />
    </a>
  </div>
)}

        
        
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
  name="emergencyContact1Phone"
  value={formData.emergencyContacts[0]?.phone || ""}
  inputClass="phone-input"
  placeholder="Phone Number 1"
  onChange={(value) => handleInputChange({ target: { name: 'emergencyContact1Phone', value } })}
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
  name="emergencyContact2Phone"
  value={formData.emergencyContacts[1]?.phone || ""}
  inputClass="phone-input"
  placeholder="Phone Number 2"
  onChange={(value) => handleInputChange({ target: { name: 'emergencyContact2Phone', value } })}
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

