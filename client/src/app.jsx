import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/auth/auth.jsx';
import LandingPage from './components/Landing/landing.jsx';
import LoginTerms from './components/T&C/loginTC.jsx';
import ProfilePersonal from './components/profileSetup/profilePersonal.jsx';
import PhoneAuth from './components/Prefrence/phoneAuth.jsx';
import TravelPreferencesFormV2 from './components/Prefrence/travelperfrenceV2.jsx';


import AdityaProfileWidget from './components/ProfilePage/profile.jsx';
import ChatsMain from './components/Chats/chatMain.jsx';
import ChatUser from './components/Chats/chatUser.jsx';
import VideoCall from './components/Chats/chatVideo.jsx';
import SubscriptionPlans from './components/Subscription/subPlan.jsx';
import LocationSearch from './components/LocationSearch/locS.jsx';
import PlanTrip from './components/Booking/bookingMain.jsx';
import PlanTripGoaDetails from './components/Booking/bookInfo.jsx';
import Dashboard from './pages/Dashboard/dash.jsx';
import FollowPage from './components/explore/explore.jsx';
import Payment from './components/payment.jsx';
import ImageUploadForm from './components/img/imgUpload.jsx';
import PostPage from './components/PostPage/FirstPost/PostPage.jsx';
// import Chat from "./components/Slidebar/slidebarmenu.jsx";
import Loader from './components/loader.jsx';
import ProfileMatch from './pages/Dashboard/profile.jsx';
import TripOnboarding from './components/Booking/tripOnboarding.jsx';
import LogoComponent from './components/logoCom.jsx';
import Profile from './components/ProfilePage/profileUser.jsx';
// import ChatTest from './components/Chats/chat.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth-main" element={<Auth />} />
        <Route path="/terms" element={<LoginTerms />} />
        <Route path="/profile-setup" element={<ProfilePersonal />} />
        <Route path="/phone-auth" element={<PhoneAuth />} />
        <Route path="/phone-auth2" element={<TravelPreferencesFormV2 />} />
        <Route path="/profile" element={<AdityaProfileWidget />} />
        <Route path="/profile-user" element={<Profile />} />

        <Route path="/chat" element={<ChatsMain />} />
        <Route path="/chat-user" element={<ChatUser />} />
        <Route path="/chat-video" element={<VideoCall />} />
        <Route path="/subscription" element={<SubscriptionPlans />} />
        <Route path="/search" element={<LocationSearch />} />
        <Route path="/book" element={<PlanTrip />} />
        <Route path="/book-info" element={<PlanTripGoaDetails />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/explore" element={<FollowPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/FirstPost" element={<PostPage />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/profile-match" element={<ProfileMatch />} />
        <Route path="/trip-onboarding" element={<TripOnboarding />} />

        <Route path="/test" element={<LogoComponent />} />

      </Routes>
    </Router>
  );
};

export default App;