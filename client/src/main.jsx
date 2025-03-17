import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/auth/auth.jsx';
import LandingPage from './components/Landing/Landing.jsx';
import LoginTerms from './components/T&C/loginTC.jsx';
import ProfilePersonal from './components/profileSetup/profilePersonal.jsx'
import PhoneAuth from './components/Prefrence/phoneAuth.jsx';
import TravelPreferencesFormV2 from './components/Prefrence/travelperfrenceV2.jsx';
import DashHome from './components/HomeDash/dash.jsx';
import SideNav from './components/HomeDash/slidebar.jsx';
import AdityaProfileWidget from './components/ProfilePage/profile.jsx';
import ChatsMain from './components/Chats/chatMain.jsx';
import ChatUser from './components/Chats/chatUser.jsx';
import VideoCall from './components/Chats/chatVideo.jsx';
import SubscriptionPlans from './components/Subscription/subPlan.jsx';
import LocationSearch from './components/LocationSearch/locS.jsx';
import PlanTrip from './components/Booking/bookingMain.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth-main" element={<Auth />} />
        <Route path="/terms" element={<LoginTerms />} />
        <Route path="/profile-setup" element={<ProfilePersonal />} />
        <Route path="/phone-auth" element={<PhoneAuth />} />
        <Route path="/phone-auth2" element={<TravelPreferencesFormV2 />} />
        <Route path="/dashboard" element={<DashHome/>} />
        <Route path="/slidebar" element={<AdityaProfileWidget/>} />
        <Route path="/chat" element={<ChatsMain/>} />
        <Route path="/chat-user" element={<ChatUser/>} />
        <Route path="/chat-video" element={<VideoCall/>} />
        <Route path="/subscription" element={<SubscriptionPlans/>} />
        <Route path="/search" element={<LocationSearch/>} />
        <Route path="/book" element={<PlanTrip/>} />

      </Routes>
    </Router>
    
  </StrictMode>
);
