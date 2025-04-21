import React from "react";
import "./subModel.css";

const SubscriptionModal = ({ onClose }) => {
  return (
    <div className="subscription-modal-backdrop">
      <div className="subscription-modal">
        <h2>🚫 Subscription Required</h2>
        <p>To start chatting with fellow travelers, please subscribe to a plan.</p>
        <button onClick={() => (window.location.href = "/subscription")}>
          View Subscription Plans
        </button>
        <span className="close-button" onClick={onClose}>
          ❌
        </span>
      </div>
    </div>
  );
};

export default SubscriptionModal;
