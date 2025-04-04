import React, { useEffect, useState } from "react";
import "./ChatUser.css";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaPaperclip } from "react-icons/fa"; // Importing React Icons
import axios from 'axios';

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

  // Simulate an auto-reply message from the other user after a delay
  const simulateReply = () => {
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "other", text: "This is an automated reply! the msg logic will implement soon" }, // Simulated reply
      ]);
    }, 1000); // Simulating a 1-second delay for the reply
  };
 const handleVideo = () => {
    // Handle video call action
    alert("Video call feature is not implemented yet.");
    navigate("/chat-video");
 }
  // const simulateReply = async () => {
  //   const userMessage = message.trim();
  //   if (!userMessage) return;
  
  //   // Add the user message to the chat
  //   setMessages((prevMessages) => [
  //     ...prevMessages,
  //     { sender: "me", text: userMessage },
  //   ]);
  //   setMessage(""); // Clear the input
  
  //   // Make an API call to OpenAI to get a response
  //   try {
  //     const response = await axios.post(
  //       'https://api.openai.com/v1/completions',
  //       {
  //         model: "text-davinci-003", // You can use the latest model available
  //         prompt: userMessage,
  //         max_tokens: 150, // Adjust the length of the response
  //         temperature: 0.7, // Adjust creativity of responses
  //       },
  //       {
  //         headers: {
  //           Authorization: `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`, // Replace with your OpenAI API key
  //         },
  //       }
  //     );
  
  //     const reply = response.data.choices[0].text.trim();
  
  //     // Add the response to the chat after a delay
  //     setTimeout(() => {
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         { sender: "other", text: reply },
  //       ]);
  //     }, 1000); // 1-second delay for response
  
  //   } catch (error) {
  //     console.error("Error fetching response from OpenAI:", error);
  //   }
  // };

  // Handle sending the message
  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "me", text: message }, // Add the sent message to the state
      ]);
      setMessage(""); // Clear the input after sending

      // Simulate a reply after a delay
      simulateReply();
    }
  };

  // Handle Enter key for sending message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <div className="user-info-chat">
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
          <button className="icon-button-chat " onClick={handleVideo} title="Video Call">
            <div className="tooltip">
              <FaCamera className="icon" />
              <span className="tooltip-text">Video Call</span>
            </div>
          </button>

          <button className="icon-button-chat" title="Booking" onClick={() => navigate("/search")}>
            <div className="tooltip">
              <FaPaperclip className="icon" />
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
        <button className="send-button" onClick={handleSendMessage}>
          &#10148;
        </button>
      </footer>
    </div>
  );
};

export default ChatUser;
