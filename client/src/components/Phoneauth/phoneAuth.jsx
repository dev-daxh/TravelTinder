// import React, { useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import "./phoneAuth.css";
// const PhoneAuth = () => {
//   const [phone, setPhone] = useState("");
//   const [isButtonEnabled, setIsButtonEnabled] = useState(false);
//   const [showOtpCard, setShowOtpCard] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [sentOtp, setSentOtp] = useState("");

//   // Handle phone number input change
//   const handlePhoneChange = (value) => {
//     setPhone(value);
//     setIsButtonEnabled(value.length >= 10); // Enable button when phone is valid
//   };

//   // Handle OTP input change
//   const handleOtpChange = (e) => {
//     const value = e.target.value;
//     if (/^\d{0,6}$/.test(value)) {
//       setOtp(value);
//     }
//   };

//   // Send OTP function
//   const handleSendOtp = async () => {
//     console.log(`Sending OTP to ${phone}`);

//     const recaptcha = new ReCap //import reacaptacha error
//     // Simulate OTP sending
//     const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
//     setSentOtp(generatedOtp);
//     console.log("OTP Sent:", generatedOtp);

//     setShowOtpCard(true);
//   };

//   // Verify OTP function
//   const handleVerifyOtp = () => {
//     console.log("Entered OTP:", otp);
//     console.log("Sent OTP:", sentOtp);

//     if (otp === sentOtp) {
//       alert("OTP verified successfully!");
//     } else {
//       alert("Invalid OTP. Please try again.");
//     }
//   };

//   return (
//     <div className="auth-background">
//       <div className="auth-container">
//         <h1 className="app-title">Phone Authentication</h1>

//         {!showOtpCard ? (
//           <>
//             <div className="input-container">
//               <PhoneInput
//                 country={"in"}
//                 value={phone}
//                 onChange={handlePhoneChange}
//                 inputClass="phone-input"
//               />
//             </div>
//             <button
//               className={`continue-button ${isButtonEnabled ? "enabled" : ""}`}
//               onClick={handleSendOtp}
//               disabled={!isButtonEnabled}
//             >
//               SEND OTP
//             </button>
//           </>
//         ) : (
//           <div className="otp-card">
//             <h2>OTP Authentication</h2>
//             <p className="otp-instruction">
//               Enter the 6-digit code we sent to your phone:
//             </p>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               maxLength="6"
//               value={otp}
//               onChange={handleOtpChange}
//               className="otp-input"
//             />
//             <button
//               onClick={handleVerifyOtp}
//               className="otp-button"
//               disabled={otp.length !== 6}
//             >
//               VERIFY OTP
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PhoneAuth;

import React, { useState } from "react";
import "./phoneAuth.css";
import { Card, CardContent, Typography, Switch, Button, Chip } from "@mui/material";

const TravelPreferencesForm = () => {
  const [travelStyle, setTravelStyle] = useState([]);
  const [travelCompanion, setTravelCompanion] = useState("");
  const [tripBudget, setTripBudget] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [transport, setTransport] = useState("");
  const [mealPreferences, setMealPreferences] = useState("");
  const [activityInterests, setActivityInterests] = useState([]);
  const [smoker, setSmoker] = useState(false);
  const [drinksAlcohol, setDrinksAlcohol] = useState(false);

  const handleMultiSelectChips = (value, state, setState) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const handleSingleSelectChips = (value, setState) => {
    setState(value);
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        {[
          {
            title: "Travel Style",
            description: "Select all that match your travel preferences",
            options: [
              "Relaxing",
              "Adventure",
              "Backpacking",
              "City Exploration",
              "Nature & Wildlife",
              "Partying",
              "Beach & Watersport",
              "Wellness & Spiritual",
            ],
            state: travelStyle,
            setState: setTravelStyle,
            multiSelect: true,
          },
          {
            title: "Preferred Travel Companion",
            description: "Choose your preferred partner",
            options: [
              "Solo travelers only",
              "Group travelers",
              "Couples",
              "Open to all",
            ],
            state: travelCompanion,
            setState: setTravelCompanion,
            multiSelect: false,
          },
          {
            title: "Trip Budget",
            description: "Choose your preferred budget range",
            options: [
              "💰 Budget (₹1,000 – ₹5,000)",
              "💸 Mid-range (₹10,000 – ₹15,000)",
              "💎 Luxury (₹20,000+)"
            ],
            state: tripBudget,
            setState: setTripBudget,
            multiSelect: false,
          },
        ].map(({ title, description, options, state, setState, multiSelect }) => (
          <Card key={title} className="preference-card">
            <CardContent>
              <Typography variant="h5" className="card-title">{title}</Typography>
              <Typography variant="body2" className="card-description">{description}</Typography>
              <div className="chip-container">
                {options.map((option) => (
                  <Chip
                    key={option}
                    label={option}
                    onClick={() =>
                      multiSelect
                        ? handleMultiSelectChips(option, state, setState)
                        : handleSingleSelectChips(option, setState)
                    }
                    color={state.includes(option) || state === option ? "primary" : "default"}
                    className="chip"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="preference-card">
          <CardContent>
            <Typography variant="h5" className="card-title">Personal Preferences</Typography>
            <div className="switch-container">
              <Typography variant="body1">Smoker</Typography>
              <Switch checked={smoker} onChange={(e) => setSmoker(e.target.checked)} color="primary" />
            </div>
            <div className="switch-container">
              <Typography variant="body1">Drinks Alcohol</Typography>
              <Switch checked={drinksAlcohol} onChange={(e) => setDrinksAlcohol(e.target.checked)} color="primary" />
            </div>
          </CardContent>
        </Card>

        <Button variant="contained" fullWidth className="next-button">
          Next
        </Button>
      </div>
    </div>
  );
};

export default TravelPreferencesForm;