import React from "react";
import "./chatMain.css"; // The CSS file for styling

const chats = [
  {
    name: "Tejas R",
    message: "Sure! Here are more name suggestions for your Blockchain-Based Land Registry System:",
    time: "3/02/2025 - 4:12pm",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRhkVcHSyTZ6mPbPFAj3aZVvBZeyaMJg-DtDnLNQidfsX9G07FD8YTfT8QdrTEAVz1gTM&usqp=CAU",
  },
  {
    name: "Ramesh",
    message: "Hey",
    time: "2/02/2025 - 4:12pm",
    image: "https://avatar.iran.liara.run/public/50",
  },
  {
    name: "Smita",
    message: "Hey",
    time: "1/02/2025 - 4:12pm",
    image: "https://avatar.iran.liara.run/public/29",
  },
];

const ChatsMain = () => {
  const handleChatClick = (chatName) => {
    console.log(`${chatName} clicked`);
    // Navigate to chat details page or other actions
  };

  return (
    <div className="chats-main">
      {/* AppBar */}
      <div className="app-bar">
        <h2 className="app-title">Messages</h2>
      </div>

      {/* Chat List */}
      <div className="chat-list">
        {chats.map((chat, index) => (
          <div key={index} className="chat-item" onClick={() => handleChatClick(chat.name)}>
            <div className="avatar-container">
              <img src={chat.image} alt={chat.name} className="avatar" />
            </div>
            <div className="chat-info">
              <div className="text-container">
                <h3 className="chat-name">{chat.name}</h3>
                <p className="chat-message">{chat.message}</p>
              </div>
              <div className="chat-footer">
                <span className="chat-time">{chat.time}</span>
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatsMain;
