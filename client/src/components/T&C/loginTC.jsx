import React, { useState } from "react";
import "./loginT&C.css";
import { useNavigate } from "react-router-dom";

const LoginTerms = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const navigate = useNavigate();
  const handleAccept = () => {
    if (isChecked) {
      alert("You have accepted the Terms and Conditions.");
      navigate('/profile');
      // Proceed to the next step (e.g., navigate to another page)
    } else {
      alert("Please agree to the Terms and Conditions before continuing.");
    }
  };

  return (
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      <p>Please read and accept our terms before proceeding.</p>

      <div className="terms-content">
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
        <button onClick={handleAccept} disabled={!isChecked}>
          Accept and Continue
        </button>
      </div>
    </div>
  );
};

export default LoginTerms;
