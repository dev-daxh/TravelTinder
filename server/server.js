require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./config/passportConfig');
const authRoutes = require('./routes/authRoute');
const userRoute = require('./routes/userProfileRoute');
const app = express();

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
