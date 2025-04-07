import React, { useState, useEffect } from "react";
import "./bookingMain.css";
import Loader from '../loader'; // Adjust path as needed
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
const PlanTrip = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("packages");
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        // Get the location name from localStorage
        const locationName = localStorage.getItem("searchedLocation");
        if (!locationName) {
          throw new Error("No location selected");
        }

        // Convert location name to lowercase and replace spaces with hyphens
        const formattedLocation = locationName.toLowerCase().replace(/\s+/g, '-');
        console.log("Formatted location:", formattedLocation);

        // Check if the JSON file exists
        const response = await fetch(`./data/${formattedLocation}.json`);
        
        // Dynamically import the JSON data
        const data = await import(`./data/${formattedLocation}.json`);
        
        setLocationData(data.default);
      } catch (err) {
        setError(err.message);
        console.error("Error loading location data:", err);
        alert("No data available for this location");
        // Redirect to the search page if no data is found
        // You can also use navigate("/search") to redirect to the search page
        // Uncomment the line below if you want to redirect to the search page
        //
        navigate("/search");
      } finally {
        setLoading(false);
      }
    };

    fetchLocationData();
  }, []);

  // Show Loader when the data is still loading
  if (loading) {
    return <Loader message="Fetching Hotel data..." />;
  }

  // Show error message if there's an error
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  // Show message if there's no location data
  if (!locationData) {
    return <div className="error">No data available for this location</div>;
  }

  const filteredData = locationData[activeTab].filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookBtn = (item) => {
    console.log("Booking details:", item);
    const amount = parseInt(item.price.replace(/[^\d]/g, "")) * 100;

    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = initializeRazorpay;
      document.body.appendChild(script);
    };

    const initializeRazorpay = () => {
      const options = {
        key: "",
        amount: amount,
        currency: "INR",
        name: "Travel Tinder",
        description: "Booking confirmation for your selected plan",
        image: "https://as2.ftcdn.net/v2/jpg/00/65/48/25/1000_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg",
        handler: function (response) {
          console.log("Payment successful:", response);
          const paymentId = response.razorpay_payment_id;
          const orderId = response.razorpay_order_id;
          alert(`Payment successful! Payment ID: ${paymentId}. Order ID: ${orderId}`);
          window.location.href = "/home";
        },
        prefill: {
          name: "Customer Name",
          email: "customer.email@example.com",
        },
        theme: {
          color: "#F4C430",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    if (window.Razorpay) {
      initializeRazorpay();
    } else {
      loadRazorpayScript();
    }
  };

  return (
    <div className="plan-trip-container">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search listings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="filter-button">⚙</button>
      </div>

      {/* Tabs for Packages & Accommodations */}
      <div className="tabs">
        <button
          className={activeTab === "packages" ? "active" : ""}
          onClick={() => setActiveTab("packages")}
        >
          Packages
        </button>
        <button
          className={activeTab === "accommodations" ? "active" : ""}
          onClick={() => setActiveTab("accommodations")}
        >
          Accommodations
        </button>
      </div>

      {/* Display Listings */}
      <div className="listings">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item.id} className="listing-card">
              <img src={item.image} alt={item.name} className="listing-image" />
              <div className="listing-info">
                <h3>{item.name}</h3>
                <p>{item.description || item.location}</p>
                <p className="price">{item.price}</p>
                {item.rating && (
                  <p className="rating">
                    ⭐ {item.rating}
                  </p>
                )}
                <button className="book-button" onClick={() => handleBookBtn(item)}>
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
};

export default PlanTrip;
