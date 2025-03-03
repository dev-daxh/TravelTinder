const express = require("express");
const { sendOTP } = require("../controllers/mailController");

const router = express.Router();

// Route to send OTP
router.post("/send-otp", sendOTP);

// Route to verify OTP (optional, can be expanded later)

module.exports = router;
