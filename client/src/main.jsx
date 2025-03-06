import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/auth/auth.jsx';
import LandingPage from './components/Landing/Landing.jsx';
import LoginTerms from './components/T&C/loginTC.jsx';
import ProfilePersonal from './components/profileSetup/profilePersonal.jsx'
import PhoneAuth from './components/Phoneauth/phoneAuth.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth-main" element={<Auth />} />
        <Route path="/terms" element={<LoginTerms />} />
        <Route path="/profile-setup" element={<ProfilePersonal />} />
        <Route path="/phone-auth" element={<PhoneAuth />} />



      </Routes>
    </Router>
  </StrictMode>
);
