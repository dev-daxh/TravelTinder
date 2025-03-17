import React from "react";
import "./chatVideo.css";
import { useNavigate } from "react-router-dom";
const VideoCall = () => {
    const navigate = useNavigate();
    const handelBack = () => {
        console.log("Back");
        navigate("/chat-user");
    }
  return (
    <div className="video-call-container">
      {/* Top Bar */}
      <header className="video-call-header">
        <button className="back-button">&#8592;</button>
        <div className="call-info">
          <span className="call-timer">32:45</span>
          <div className="network-status">
            <span className="network-icon">&#128246;</span> 4G
          </div>
        </div>
      </header>

      {/* Video Screen */}
      <main className="video-screen">
        <img
          src="https://thumbs.dreamstime.com/b/young-indian-man-having-fun-doing-video-call-outdoor-home-garden-mobile-phone-happy-person-using-technology-trends-tech-181375754.jpg"
          alt="Main Video"
          className="main-video"
        />
        <div className="small-video">
          <img
            src="https://media.istockphoto.com/id/1693760502/photo/video-call-online-conversation-indian-man-sitting-on-sofa-at-home-looking-at-web-camera.jpg?s=612x612&w=0&k=20&c=vjEOGPQChpTs9DtdS3Nj0QRf7i4bxPuFCHF6bFAydt4="
            alt="User Video"
            className="small-video-frame"
          />
        </div>
      </main>

      {/* Call Controls */}
      <footer className="video-call-controls">
        <button className="icon-button"><img src="https://cdn-icons-png.flaticon.com/128/5844/5844904.png" className="icons"alt="" /></button>
        <button className="icon-button"><img src="https://cdn-icons-png.flaticon.com/128/10503/10503311.png"className="icons" alt="" /></button>
        <button className="icon-button"><img src="https://cdn-icons-png.flaticon.com/128/5844/5844904.png" alt="" className="icons"/></button>
        <button className="icon-button"><img src="https://cdn-icons-png.flaticon.com/128/11411/11411295.png" alt="" className="icons"/></button>
      </footer>
    </div>
  );
};

export default VideoCall;
