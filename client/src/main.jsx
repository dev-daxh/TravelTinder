import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import the Router

import Auth from './components/auth/auth.jsx';
import LandingPage from './components/Landing/Landing.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth-main" element={<Auth />} />

      </Routes>
    </Router>
  </StrictMode>
);
