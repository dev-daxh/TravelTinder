import React, { useState, useEffect } from "react";
import "./bookingMain.css";
import Loader from '../loader';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LogoComponent from "../logoCom";
import * as AiIcons from 'react-icons/ai';

const PlanTrip = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("packages");
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const locationName = localStorage.getItem("searchedLocation");
        if (!locationName) {
          throw new Error("No location selected");
        }

        const formattedLocation = locationName.toLowerCase().replace(/\s+/g, '-');
        console.log("Formatted location:", formattedLocation);

        const response = await fetch(`./data/${formattedLocation}.json`);
        const data = await import(`./data/${formattedLocation}.json`);
        
        setLocationData(data.default);
      } catch (err) {
        setError(err.message);
        console.error("Error loading location data:", err);
        alert("No data available for this location");
        navigate("/search");
      } finally {
        setLoading(false);
      }
    };

    fetchLocationData();
  }, []);

  const handleBookBtn = (item) => {
    console.log("Booking details:", item);
    const amount = parseInt(item.price.replace(/[^\d]/g, "")) * 100;
    setBookingDetails(item);

    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = initializeRazorpay;
      document.body.appendChild(script);
    };

    const initializeRazorpay = () => {
      const options = {
        key: "rzp_test_OgBgPiHR93lvSY",
        amount: amount,
        currency: "INR",
        name: "Travel Tinder",
        description: "Booking confirmation for your selected plan",
        image: "https://as2.ftcdn.net/v2/jpg/00/65/48/25/1000_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg",
        handler: function (response) {
          console.log("Payment successful:", response);
          const paymentId = response.razorpay_payment_id;
          const orderId = response.razorpay_order_id;
          setPaymentSuccess(true);
          setOpenDialog(true); // Open the Material-UI dialog
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

  const handlePublishTrip = () => {
    localStorage.setItem('currentBooking', JSON.stringify(bookingDetails));
    setOpenDialog(false);
    navigate("/trip-onboarding");
  };

  const handleDontPublish = () => {
    setOpenDialog(false);
    window.location.href = "/home";
  };

  if (loading) {
    return <Loader message="Fetching Hotel data..." />;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!locationData) {
    return <div className="error">No data available for this location</div>;
  }

  const filteredData = locationData[activeTab].filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleHome = () => {
    navigate('/home');
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
        <button className="filter-button" onClick={handleHome}><AiIcons.AiFillHome style={{ color: 'black' }} /></button>
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

      {/* Material-UI Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDontPublish}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Payment Successful!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your booking has been confirmed. Would you like to publish this trip?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDontPublish}>No, Keep It Private</Button>
          <Button onClick={handlePublishTrip} autoFocus>
            Yes, Publish My Trip
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PlanTrip;