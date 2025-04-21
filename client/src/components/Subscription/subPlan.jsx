import React from "react";
import axios from "axios";
import "./subPlan.css";

const plansData = [
  {
    id: 1,
    name: "🌿 Basic Explorer",
    price: 49, // ₹50
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
    price: 99, // ₹100
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
    price: 199, // ₹200
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
  const apiKey = import.meta.env.RAZORPAY_KE;
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Function to create a Razorpay order
  const createRazorpayOrder = async (amount) => {
    let data = JSON.stringify({
      amount: amount * 100, // Convert INR to paise (Razorpay accepts amount in paise)
      currency: "INR",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/api/payment/make-payment",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log("Order response:", response.data);
      handleRazorpayScreen(response.data.amount);
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
    }
  };

  // Function to handle the Razorpay payment screen
  const handleRazorpayScreen = async (amount) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Some error occurred while loading Razorpay");
      return;
    }

    const options = {
      key: "rzp_test_OgBgPiHR93lvSY", // Replace with your Razorpay key
      amount: amount,
      currency: "INR",
      name: "Travel Tinder",
      description: "Payment for selected subscription plan",
      image:
        "https://as2.ftcdn.net/v2/jpg/00/65/48/25/1000_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg",
        handler: function (response) {
          console.log("Payment successful, Razorpay ID:", response.razorpay_payment_id);
          alert("Payment successful: " + response.razorpay_payment_id);
        
          // ✅ Save subscription status to localStorage
          localStorage.setItem("subscription", "done");
          
          // Optionally navigate to homepage or chats
          window.location.href = "/chat";
        },
        
      prefill: {
        name: "Daksh Titarmare",
        email: "itrnitydaksh@gmail.com",
      },
      theme: {
        color: "#F4C430",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // Function to handle plan selection
  const handelPlan = (plan) => {
    console.log("Selected Plan Data:", plan); // Log the selected plan
    alert("Plan Selected: " + plan.name); // Optional: Show a message to the user
    createRazorpayOrder(plan.price); // Trigger Razorpay payment with the price of the selected plan
  };
  const handleBack = () => {
    // Redirect to the previous page
    window.history.back();
  }

  return (
    <div className="subscription-container">
      {/* Header */}
      <div className="subscription-header">
      <button onClick={handleBack} className="back-button-sub">&#8592;</button>

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
                <p className="price">{plan.price} INR/month</p>
              </div>
              <div className="plan-icon">{plan.icon}</div>
            </div>
            <p className="plan-description">{plan.description}</p>
            <ul className="plan-features">
              {plan.features.map((feature, index) => (
                <li key={index}>✅ {feature}</li>
              ))}
            </ul>
            {/* Button to select the plan and trigger the payment */}
            <button className="select-button" onClick={() => handelPlan(plan)}>
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
