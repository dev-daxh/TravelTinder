
import React, { useEffect, useState } from "react";
import "./ChatUser.css";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaPaperclip } from "react-icons/fa";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogoComponent from "../logoCom";

const socket = io("http://localhost:8080");

// Add this new component at the top of your file (before ChatUser)
const Logo = () => {
  const navigate = useNavigate();

  return (
    <div className="logo-container">
      <img 
        src="https://static.vecteezy.com/system/resources/previews/009/297/690/non_2x/india-travel-logo-vector.jpg" 
        alt="Company Logo" 
        className="logo-image"
        onClick={() => navigate('/home')}
      />
    </div>
  );
};
const ChatUser = () => {
  const [message, setMessage] = useState(""); // Input message
  const [messages, setMessages] = useState([]); // List of messages
  const [chatName, setChatName] = useState("");
  const [chatProfile, setChatProfile] = useState("");
  const navigate = useNavigate();

  // Fetch chatName and chatProfile from localStorage
  useEffect(() => {
    const storedChatName = localStorage.getItem("chatName");
    const storedChatProfile = localStorage.getItem("chatProfile");

    if (!storedChatName || !storedChatProfile) {
      alert("No chat data found");
      navigate("/chat");
    } else {
      setChatName(storedChatName);
      setChatProfile(storedChatProfile);
    }
  }, [navigate]);

  // Setup socket listener for incoming messages
  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup the socket listener when the component unmounts
    return () => {
      socket.off("newMessage");
    };
  }, []); // Empty dependency array means this runs once when the component mounts

  const sendMessage = () => {
    if (message.trim()) {
      // Check for 4 or more continuous digits
      const digitMatch = message.match(/\d{4,}/);
      if (digitMatch) {
        toast.warning("For your privacy, please avoid sharing contact numbers in chat.",
          {
            position: "top-center",
            autoClose: 2500,
            
          }
        );
        return; // Stop sending the message
      }
  
      socket.emit("sendMessage", message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "me", text: message },
      ]);
      setMessage("");
    }
  };
  

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleVideo = () => {
    alert("Video call feature is not implemented yet.");
    navigate("/chat-video");
  }; 
  const handleBack = () => {
    // Redirect to the previous page
    location.href = "/chat";
  }
  

  return (
    <div className="chat-container">

      <header className="chat-header">
        <div className="user-info-chat">
        <button onClick={handleBack} className="back-button-chat">&#8592;</button>

          <img
            src={chatProfile || "https://via.placeholder.com/40"} // Default image if not available
            alt="User"
            className="user-avatar"
          />
          <div>
            <h4 className="user-name">{chatName || "User Name"}</h4>
            <div className="user-status">
              <span className="status-dot"></span> Online
            </div>
          </div>
        </div>

        <div className="chat-actions">
          {/* <button className="icon-button-chat" onClick={handleVideo} title="Video Call">
            <div className="tooltip">
              <FaCamera className="icon" />
              <span className="tooltip-text">Video Call</span>
            </div>
          </button> */}

          <button className="icon-button-chat" title="Booking" onClick={() => navigate("/search")}>
            <div className="tooltip">
              <img className="icon" src="https://cdn-icons-png.flaticon.com/512/2356/2356937.png" />
              <span className="tooltip-text">Booking</span>
            </div>
          </button>
        </div>
      </header>

      <main className="chat-body">
        {/* Display messages */}
        {messages.map((msg, index) => (
          <div
            className={`message ${msg.sender === "me" ? "sent" : "received"}`}
            key={index}
          >
            {msg.text}
          </div>
        ))}
      </main>

      <footer className="chat-footer">
        <input
          type="text"
          placeholder="Type your message..."
          className="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Update message input
          onKeyPress={handleKeyPress} // Handle Enter key press
        />
        <button className="send-button" onClick={sendMessage}>
          &#10148;
        </button>
      </footer>
      <ToastContainer position="top-center" />

    </div>
  );
};

export default ChatUser;
