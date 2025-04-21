import React, { useState } from "react";
import "./loginT&C.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import axios from 'axios';
import Loader from "../loader";

const LoginTerms = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false); // Loader state
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleAccept = async () => {
    if (isChecked) {
      const savedEmail = localStorage.getItem("email");

      if (savedEmail) {
        setLoading(true); // Show loader
        try {
          const response = await axios.post("http://localhost:3001/api/user/search-user", {
            email: savedEmail,
          });

          const data = response.data;
          console.log("Response Data:", data);

          if (data.message === 'found') {
            toast.success("Welcome back!", {
              position: "top-right",
              autoClose: 1700,
              theme: "light",
              transition: Bounce,
              onClose: () => navigate("/home"),
            });
          } else if (data.message === 'not') {
            toast.success("Welcome new user! Please complete your profile.", {
              position: "top-right",
              autoClose: 1700,
              theme: "light",
              transition: Bounce,
              onClose: () => navigate("/profile-setup"),
            });
          } else {
            toast.error("Something went wrong!", {
              position: "top-right",
              autoClose: 1700,
              theme: "light",
              transition: Bounce,
            });
          }
        } catch (error) {
          console.error("Axios error:", error);
          toast.error("Something went wrong!", {
            position: "top-right",
            autoClose: 1700,
            theme: "light",
            transition: Bounce,
          });
        } finally {
          setLoading(false); // Hide loader
        }
      }
    }
  };

  return (
    <div className="terms-container">
      {loading && <Loader message="Sit back & Relax" />} {/* Show loader when loading */}
      
      <h1>Terms and Conditions</h1>
      <p>Please read and accept our terms before proceeding.</p>

      <div className="terms-content">
        {/* All your T&C sections here... (same as your original code) */}
        <h2>1. Introduction</h2>
        <p>Welcome to our service. By using this platform, you agree to comply with and be bound by these terms and conditions.</p>

        <h2>2. User Responsibilities</h2>
        <p>Users must maintain accurate account information and ensure the security of their login credentials.</p>

        <h2>3. Privacy Policy</h2>
        <p>We collect and process personal data in accordance with our Privacy Policy, which is incorporated into these terms.</p>

        <h2>4. Payment Terms</h2>
        <p>All payments are processed securely through our payment providers. Fees and charges will be clearly communicated.</p>

        <h2>5. Refund Policy</h2>
        <p>Refunds are processed according to our refund policy, which considers the nature and timing of the request.</p>

        <h2>6. Account Suspension</h2>
        <p>We reserve the right to suspend or terminate accounts that violate our terms or engage in prohibited activities.</p>

        <h2>7. Governing Law</h2>
        <p>These terms are governed by applicable laws, and any disputes shall be resolved in the appropriate jurisdiction.</p>

        <h2>8. Contact Information</h2>
        <p>For any questions or concerns regarding these terms, please contact our support team.</p>

        <h2>9. Permissions</h2>
        <p>By accepting terms, you are providing permissions for location access.</p>
      </div>

      <div className="terms-footer">
        <label>
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          I have read and agree to the Terms and Conditions
        </label>
        <button className="accept" onClick={handleAccept} disabled={!isChecked || loading}>
          {loading ? "Processing..." : "Accept and Continue"}
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginTerms;
