import React, { useState } from "react";
import axios from "axios";
import "./auth.css";

const AuthPage = () => {
  const [email, setEmail] = useState(""); // Changed phone to email
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showOtpCard, setShowOtpCard] = useState(false); // New state for showing OTP card
  const [otp, setOtp] = useState(""); // State for OTP input
  const [sentOtp, setSentOtp] = useState(""); // State to store sent OTP for verification

  // Handle email input change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    // Enable the button if the email is valid
    setIsButtonEnabled(validateEmail(value));
  };

  // Email validation
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  // Handle Continue button click
  const handleContinue = async () => {
    console.log(`Email ${email} submitted!`);

    // Simulate OTP sending logic (API call or something else)
    try {
      const response = await axios.post("http://localhost:3001/api/auth/send-otp", { email });
      console.log("Message ID:", response.data.messageId); // Log messageId to console
      console.log("OTP:", response.data.otp); // Log messageId to console

      setSentOtp(response.data.otp); // Store the sent OTP for later verification
      setShowOtpCard(true); // Show OTP input card
    } catch (error) {
      console.error("Error sending OTP:", error);
    }

    setEmail(""); // Clear the email input
    setIsButtonEnabled(false); // Disable button until new valid email is entered
  };

  // Handle OTP input change
  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Prevent non-numeric input

    if (value.length <= 6) {
      setOtp(value);
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = () => {
    // Log both the entered OTP and sent OTP for comparison
    console.log("Entered OTP:", otp);
    console.log("Sent OTP:", sentOtp);
  
    if (otp.length === 6) {
      // Compare both values (ensure both are strings and trim any whitespace)
      if (String(otp).trim() === String(sentOtp).trim()) {
        alert("OTP verified successfully!");
        // Proceed to next step (e.g., redirect or other actions)
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } else {
      alert("Please enter a valid 6-digit OTP.");
    }
  };
  

  return (
    <div className="auth-background">
      <div className="auth-container">
        <h1 className="app-title">Travel Tinder</h1>

        {/* Email input */}
        {!showOtpCard ? (
          <div className="input-container">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="email-input"
            />
          </div>
        ) : (
          // OTP input card (this is shown after Continue button is clicked)
          <div className="otp-card">
            <h2>OTP Authentication</h2>
            <p className="otp-instruction">
              Enter the 6-digit code we sent to your email address (check SPAM/BIN):
            </p>
            <input
              type="text"
              placeholder="Enter OTP"
              maxLength="6"
              value={otp}
              onChange={handleOtpChange}
              className="otp-input"
            />
            <button
              onClick={handleOtpSubmit}
              className="otp-button"
              disabled={otp.length !== 6}
            >
              VERIFY OTP
            </button>
          </div>
        )}

        {/* Continue button (visible when OTP card is not shown) */}
        {!showOtpCard && (
          <button
            className={`continue-button ${isButtonEnabled ? "enabled" : ""}`}
            onClick={handleContinue}
            disabled={!isButtonEnabled}
          >
            CONTINUE
          </button>
        )}

        <div className="divider">Or Login/Signup With</div>

        <div className="social-buttons">
          <button type="button" className="login-with-google-btn">
            Sign in with Google
          </button>
        </div>

        <p className="terms-text">
          By proceeding, you agree to Travel Tinder’s{" "}
          <a href="#">Privacy Policy</a>, <a href="#">T&Cs</a>.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
