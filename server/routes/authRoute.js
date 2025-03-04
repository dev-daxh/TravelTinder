const express = require("express");
const { sendOTP,googleauthController } = require("../controllers/authController");

const router = express.Router();

// Route to send OTP
router.post("/send-otp", sendOTP);
router.post("/google",googleauthController.getGoogleAuth);
router.post("/google/callback",googleauthController.getGoogleCallback);


module.exports = router;

