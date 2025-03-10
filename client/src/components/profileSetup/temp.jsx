
// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import TravelPreferencesForm from "../Prefrence/phoneAuth";
// import TravelPreferencesFormV2 from "../Prefrence/travelperfrenceV2";
// import "./profilePer.css";

// const ProfileSetup = () => {
//   const [step, setStep] = useState(1);
//   const [progress, setProgress] = useState(0);
//   const [formData, setFormData] = useState({
//     firstName: "", lastName: "", dob: "", gender: "", bio: "",
//     profilePicture: null, phone: "", aadharNumber: "", aadharFile: null,
//     emergencyContacts: [{ name: "", phone: "" }, { name: "", phone: "" }],
//     country: "", city: "", languages: "",
//     travelInterests: "", lookingFor: "", instagram: "", facebook: "", twitter: "",
//     travelPreferences: {} 
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes("emergencyContact")) {
//       const index = name.includes("1") ? 0 : 1;
//       const field = name.includes("Name") ? "name" : "phone";
//       const updatedContacts = [...formData.emergencyContacts];
//       updatedContacts[index][field] = value;
//       setFormData({ ...formData, emergencyContacts: updatedContacts });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setFormData({ ...formData, profilePicture: reader.result });
//       reader.readAsDataURL(file);
//     }
//   };

//   const handlePhoneChange = (value) => setFormData({ ...formData, phone: value });

//   const nextStep = () => step < 4 && setStep(step + 1);
//   const prevStep = () => step > 1 && setStep(step - 1);

//   const handleSubmit = async () => {
//     if (new Date().getFullYear() - new Date(formData.dob).getFullYear() < 18) {
//       toast.error("You must be at least 18 years old to register.");
//       return;
//     }
//     try {
//       const response = await axios.post("http://localhost:3001/api/user/create-user", formData);
//       response.status === 201 ? toast.success("Profile created successfully!") : toast.error("Error saving profile.");
//     } catch (error) {
//       toast.error("Error saving profile. Please try again.");
//     }
//   };

//   return (
//     <div className="profile-container">
//       <div className="progress-bar" style={{ width: `${progress}%` }}></div>
//       <h1>Profile Setup</h1>
//       <p>Step {step} of 4</p>

//       {step === 1 && (
//         <div className="form-section">
//           <input type="text" name="firstName" placeholder="First Name*" value={formData.firstName} onChange={handleInputChange} />
//           <input type="text" name="lastName" placeholder="Last Name*" value={formData.lastName} onChange={handleInputChange} />
//           <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
//           <textarea name="bio" placeholder="Tell us about yourself..." value={formData.bio} onChange={handleInputChange}></textarea>
//         </div>
//       )}

//       {step === 2 && (
//         <div className="form-section">
//           <PhoneInput country={"in"} value={formData.phone} onChange={handlePhoneChange} placeholder="Phone Number*" />
//           <input type="text" name="aadharNumber" placeholder="Aadhar Number*" value={formData.aadharNumber} onChange={handleInputChange} />
//           <input type="file" name="aadharFile" onChange={handleFileChange} />
//         </div>
//       )}

//       {step === 3 && <TravelPreferencesForm formData={formData} setFormData={setFormData} />}
//       {step === 4 && <TravelPreferencesFormV2 formData={formData} setFormData={setFormData} />}

//       <div className="navigation-buttons">
//         {step > 1 && <button onClick={prevStep}>Back</button>}
//         {step < 4 ? <button onClick={nextStep}>Next</button> : <button onClick={handleSubmit}>Submit</button>}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ProfileSetup;


//10-03-2025 (5:09)


// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import TravelPreferencesForm from "../Prefrence/phoneAuth";
// import TravelPreferencesFormV2 from "../Prefrence/travelperfrenceV2";
// import "./profilePer.css";

// const ProfileSetup = () => {
//   const [step, setStep] = useState(1);
//   const [progress, setProgress] = useState(0);
//   const [formData, setFormData] = useState({
//     firstName: "", lastName: "", dob: "", gender: "", bio: "",
//     profilePicture: null, phone: "", aadharNumber: "", aadharFile: null,
//     emergencyContacts: [{ name: "", phone: "" }, { name: "", phone: "" }],
//     country: "", city: "", languages: "",
//     travelInterests: "", lookingFor: "", instagram: "", facebook: "", twitter: "",
//     travelPreferences: {} 
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes("emergencyContact")) {
//       const index = name.includes("1") ? 0 : 1;
//       const field = name.includes("Name") ? "name" : "phone";
//       const updatedContacts = [...formData.emergencyContacts];
//       updatedContacts[index][field] = value;
//       setFormData({ ...formData, emergencyContacts: updatedContacts });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setFormData({ ...formData, profilePicture: reader.result });
//       reader.readAsDataURL(file);
//     }
//   };

//   const handlePhoneChange = (value) => setFormData({ ...formData, phone: value });

//   const nextStep = () => step < 4 && setStep(step + 1);
//   const prevStep = () => step > 1 && setStep(step - 1);

//   const handleSubmit = async () => {
//     if (new Date().getFullYear() - new Date(formData.dob).getFullYear() < 18) {
//       toast.error("You must be at least 18 years old to register.");
//       return;
//     }
//     try {
//       const response = await axios.post("http://localhost:3001/api/user/create-user", formData);
//       response.status === 201 ? toast.success("Profile created successfully!") : toast.error("Error saving profile.");
//     } catch (error) {
//       toast.error("Error saving profile. Please try again.");
//     }
//   };

//   return (
//     <div className="profile-container">
//       <div className="progress-bar" style={{ width: `${progress}%` }}></div>
//       <h1>Profile Setup</h1>
//       <p>Step {step} of 4</p>

//       {step === 1 && (
//         <div className="form-section">
//           <input type="text" name="firstName" placeholder="First Name*" value={formData.firstName} onChange={handleInputChange} />
//           <input type="text" name="lastName" placeholder="Last Name*" value={formData.lastName} onChange={handleInputChange} />
//           <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
//           <textarea name="bio" placeholder="Tell us about yourself..." value={formData.bio} onChange={handleInputChange}></textarea>
//         </div>
//       )}

//       {step === 2 && (
//         <div className="form-section">
//           <PhoneInput country={"in"} value={formData.phone} onChange={handlePhoneChange} placeholder="Phone Number*" />
//           <input type="text" name="aadharNumber" placeholder="Aadhar Number*" value={formData.aadharNumber} onChange={handleInputChange} />
//           <input type="file" name="aadharFile" onChange={handleFileChange} />
//         </div>
//       )}

//       {step === 3 && <TravelPreferencesForm formData={formData} setFormData={setFormData} />}
//       {step === 4 && <TravelPreferencesFormV2 formData={formData} setFormData={setFormData} />}

//       <div className="navigation-buttons">
//         {step > 1 && <button onClick={prevStep}>Back</button>}
//         {step < 4 ? <button onClick={nextStep}>Next</button> : <button onClick={handleSubmit}>Submit</button>}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ProfileSetup;
