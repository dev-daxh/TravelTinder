import React, { useState } from "react";
import "./bookingMain.css";

const planData = {
  packages: [
    {
      id: 1,
      name: "Sunset Beach Bliss Tour",
      description: "Experience Goa's most beautiful beaches and thrilling water sports.",
      price: "₹12,999",
      image: "https://www.bookingnear.com/storage/package-gallery/large_1-goa-tour-package.jpeg",
    },{
      id: 2,
      name: "Heritage Discovery Tour",
      description: "Explore Portuguese architecture and ancient churches.",
      price: "₹15,999",
      image: "https://www.pelago.com/img/products/IN-India/old-goa-heritage-walk-by-make-it-happen.jpg",
    },
    
  ],
  accommodations: [
    {
      id: 1,
      name: "Beachside Resort",
      location: "Near Baga Beach",
      price: "₹3,000/night",
      rating: "4.5",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/93/e1/d5/caption.jpg",
    },
    {
      id: 2,
      name: "Luxury Hotel",
      location: "Main Road, Opp Siva Beach",
      price: "₹2,000/night",
      rating: "4.2",
      image: "https://images.trvl-media.com/lodging/6000000/5180000/5171900/5171850/94e5acdd_y.jpg",
    },
  ],
};

const PlanTrip = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("packages");

  const filteredData = planData[activeTab].filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handelBookBtn = () => {
    alert("Booking Confirmed!",);
  }
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
        <button className={activeTab === "packages" ? "active" : ""} onClick={() => setActiveTab("packages")}>
          Packages
        </button>
        <button className={activeTab === "accommodations" ? "active" : ""} onClick={() => setActiveTab("accommodations")}>
          Accommodations
        </button>
      </div>

      {/* Display Listings */}
      <div className="listings">
        {filteredData.map((item) => (
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
              <button className="book-button" onClick={handelBookBtn}>Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanTrip;


