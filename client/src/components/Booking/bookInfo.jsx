import React from "react";
import "./bookInfo.css";

const hotelData = {
  id: 1,
  name: "Anjoned Goa",
  rating: "4.9 Stars",
  description:
    "A beach is a narrow, gently sloping strip of land that lies along the edge of an ocean, lake, or river. Materials such as sand, pebbles, rocks, and seashell fragments cover beaches.",
  price: "₹600",
  extraFees: "+ taxes/fees",
  priceLabel: "per night",
  amenities: [
    { icon: "🏖️", title: "20", subtitle: "Spots" },
    { icon: "📶", title: "Free", subtitle: "Wifi" },
    { icon: "🎥", title: "CCTV", subtitle: "Surveillance" },
  ],
  image: "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/487359364.jpg?k=b9cab8b7a8eead6a470828667f646f91d9e4013d766159d65700a8fdc314ba10&o=&s=1024x",
};

const PlanTripGoaDetails = () => {
  return (
    <div className="plan-trip-details">
      {/* Header */}
      <header className="details-header">
        <button className="back-button">&#8592;</button>
      </header>

      {/* Hero Image */}
      <div className="hero-image">
        <img src={hotelData.image} alt={hotelData.name} />
      </div>

      {/* Hotel Info */}
      <div className="hotel-info">
        <h2 className="hotel-name">{hotelData.name}</h2>
        <div className="rating-section">
          <span className="star-icon">⭐</span>
          <p className="rating-text">{hotelData.rating}</p>
        </div>
        <p className="hotel-description">{hotelData.description}</p>
      </div>

      <hr className="divider" />

      {/* Amenities Section */}
      <div className="amenities-section">
        {hotelData.amenities.map((amenity, index) => (
          <div key={index} className="amenity-card">
            <span className="amenity-icon">{amenity.icon}</span>
            <p className="amenity-title">{amenity.title}</p>
            <p className="amenity-subtitle">{amenity.subtitle}</p>
          </div>
        ))}
      </div>

      <hr className="divider" />

      {/* Booking Section */}
      <div className="booking-container">
        <div className="price-info">
          <p className="price">{hotelData.price}</p>
          <p className="extra-fees">{hotelData.extraFees}</p>
          <p className="price-label">{hotelData.priceLabel}</p>
        </div>
        <button className="book-button">Book</button>
      </div>
    </div>
  );
};

export default PlanTripGoaDetails;
