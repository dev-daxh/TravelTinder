require("dotenv").config();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken"); // Import jwt for token generation
const passport = require("../config/passportConfig");


// Create a transporter for sending emails using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com", // Correct Gmail SMTP host
  port: 465,
  secure: true, // true for port 465
  auth: {
    user: process.env.SENDER_EMAIL, 
    pass: process.env.APP_PASSWORD, 
  },
  debug: true,
});

// Send OTP function
async function sendOTP(req, res) {
  const { email } = req.body; // Extract email from request body

  // Generate a random 6-digit OTP code
  const otpCode = Math.floor(100000 + Math.random() * 900000); 

  try {
    // Send the OTP email
    const info = await transporter.sendMail({
      from: `"Travel Tinder" <${process.env.SENDER_EMAIL}>`, // Sender address
      to: email, // Recipient's email address (dynamic)
      subject: "Travel Tinder Email Verification 🗺️", // Subject line
      text: `Hello, \n\nYour OTP for email verification is: ${otpCode}\n\nThank you for verifying your email with Travel Tinder!`, // Plain text body
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; background: #f1f1f1; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #007bff;">Welcome to Travel Tinder!</h2>
              <p style="font-size: 16px; color: #444;">Please use the OTP below to verify your email address.</p>
              <div style="font-size: 24px; font-weight: bold; color: #007bff; margin: 20px 0;">
                ${otpCode}
              </div>
              <p style="font-size: 14px; color: #666;">If you did not request this email, please ignore it.</p>
              <div style="font-size: 12px; color: #777; margin-top: 30px;">
                <p>Thank you for being a part of Travel Tinder 🚀!</p>
                <p><a href="https://www.traveltinder.com" style="color: #007bff; text-decoration: none;">Visit Travel Tinder</a></p>
              </div>
            </div>
          </body>
        </html>
      `, // HTML body
    });

     // Log message ID to the console
     console.log("Message sent: %s", info.messageId);

     // Send response with message ID and OTP code
     return res.status(200).json({
       messageId: info.messageId,
       otp: otpCode,
     });
   } catch (error) {
     console.error("Error sending OTP:", error);
     return res.status(500).json({ message: "Error sending OTP. Please try again later." });
   }
}


const googleauthController = {
  // Google authentication route
  getGoogleAuth: passport.authenticate("google", { scope: ["profile", "email"] }),

  // Google callback route
  getGoogleCallback: [
    passport.authenticate("google", { failureRedirect: "/auth-main" }),
    (req, res) => {
      // After successful authentication, we will send back the user info and token

      const user = req.user; // This contains the Google user profile info

      // Create a JWT token (you can customize the payload)
      const token = jwt.sign(
        {
          userId: user.id, // Assuming `user.id` is available after successful authentication
          email: user.emails[0].value, // Assuming the email is available in the profile
        },
        process.env.JWT_SECRET, // Use a secret key from your environment variables
        { expiresIn: '1h' } // Token expiration time (optional)
      );

      // Send the user's email and token back in the response
      res.json({
        email: user.emails[0].value,
        token: token,
      });
    },
  ],

  // Profile route (Optional: Can be used to show the profile page if needed)
  getProfile: (req, res) => {
    if (!req.user) {
      return res.redirect("/auth-main");
    }
    res.send(`Welcome`);
  },

  // Logout route
  logout: (req, res) => {
    req.logout(() => {
      res.redirect("/auth-main");
    });
  },
};




// // Verify OTP function (you can implement this later if needed)
// async function verifyOTP(req, res) {
//   const { otp, userOtp } = req.body;
//   if (otp === userOtp) {
//     return res.status(200).json({ message: "OTP verified successfully!" });
//   } else {
//     return res.status(400).json({ message: "Invalid OTP!" });
//   }
// }

module.exports = { sendOTP,googleauthController };
