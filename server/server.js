require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./config/passportConfig');
const authRoutes = require('./routes/authRoute');
const userRoute = require('./routes/userProfileRoute');
const authPayment = require('./routes/authPayment');
const jsonRoute = require('./routes/jsonRoute');
const app = express();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const uploads = 'uploads';

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use authentication routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoute); // Ensure the /api/user route is correctly mapped
app.use('/api/uploads', express.static(path.join(__dirname, uploads)));
app.use('/api/explore', authRoutes);
app.use('/api/payment', authPayment);
app.use('/api/json', jsonRoute);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

