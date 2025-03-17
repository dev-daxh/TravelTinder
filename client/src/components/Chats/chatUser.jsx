import React, { useState } from "react";
import "./ChatUser.css";

const ChatUser = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    console.log("Message sent:", message);
    setMessage(""); // Clear input after sending
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <div className="user-info">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRhkVcHSyTZ6mPbPFAj3aZVvBZeyaMJg-DtDnLNQidfsX9G07FD8YTfT8QdrTEAVz1gTM&usqp=CAU"
            alt="User"
            className="user-avatar"
          />
          <div>
            <h4 className="user-name">Tejas R.</h4>
            <div className="user-status">
              <span className="status-dot"></span> Online
            </div>
          </div>
        </div>

        <div className="chat-actions">
        <button className="icon-button">
            <img
              src="https://cdn-icons-png.flaticon.com/128/1821/1821177.png"
              alt="camera"
              className="icon"
            />
          </button>
          
          <button className="icon-button">
            <img
              src="https://cdn-icons-png.flaticon.com/128/8407/8407957.png"
              alt="attachment"
              className="icon"
            />
          </button>
          
        </div>
      </header>

      <main className="chat-body">
        <div className="message sent">Hey! How are you doing?</div>
        <div className="message received">I'm good, thanks!</div>
      </main>

      <footer className="chat-footer">
        <input
          type="text"
          placeholder="Type your message..."
          className="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="send-button" onClick={handleSendMessage}>
          &#10148;
        </button>
      </footer>
    </div>
  );
};

export default ChatUser;
