import React from "react";
import "./subPlan.css";

const plansData = [
  {
    id: 1,
    name: "🌿 Basic Explorer",
    price: "₹49/month",
    description: "For travelers seeking quick connections.",
    icon: "🚀",
    features: [
      "Unlimited chats with up to 5 travel companions",
      "30 daily swipes (10 more than before!)",
      "1 free group trip invite per month",
      "Access to basic travel blogs & tips",
    ],
  },
  {
    id: 2,
    name: "🚀 Pro Voyager",
    price: "₹99/month",
    description: "Great for building travel groups and planning trips together.",
    icon: "📈",
    features: [
      "Unlimited chats for 7 days",
      "10% off on tour packages & activities",
      "2 free group trip invites per month",
      "Priority support for faster assistance",
    ],
  },
  {
    id: 3,
    name: "💎 Globetrotter Elite",
    price: "₹199/month",
    description: "All-in-One for Frequent Travelers",
    icon: "💎",
    features: [
      "Unlimited swipes & chats",
      "24/7 dedicated customer support",
      "15% off on hotels, and packages",
      "Access to premium travel guides & exclusive events",
    ],
  },
];

const SubscriptionPlans = () => {
  // Updated handelPlan to accept plan data
  const handelPlan = (plan) => {
    console.log("Selected Plan Data:", plan); // Log the selected plan
    alert("Plan Selected: " + plan.name); // Optional: Show a message to the user
  }

  return (
    <div className="subscription-container">
      {/* Header */}
      <div className="subscription-header">
        <h2>Choose Your Plan</h2>
        <p>Select the perfect plan for your needs</p>
      </div>

      {/* Plans List Rendered from JSON */}
      <div className="plans">
        {plansData.map((plan) => (
          <div key={plan.id} className="plan-card">
            <div className="plan-info">
              <div>
                <h3>{plan.name}</h3>
                <p className="price">{plan.price}</p>
              </div>
              <div className="plan-icon">{plan.icon}</div>
            </div>
            <p className="plan-description">{plan.description}</p>
            <ul className="plan-features">
              {plan.features.map((feature, index) => (
                <li key={index}>✅ {feature}</li>
              ))}
            </ul>
            {/* Correct way to pass plan data */}
            <button className="select-button" onClick={() => handelPlan(plan)}>Select Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
