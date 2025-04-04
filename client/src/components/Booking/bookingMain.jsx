import React, { useState } from "react";
import "./bookingMain.css";


//remmove this instaed of this fetch data from an json file which store in direcotry

const planData = {
  packages: [
    {
      "id": 1,
      "name": "Sunset Beach Bliss Tour",
      "description": "Experience Goa's most beautiful beaches, thrilling water sports, and vibrant beach shacks. Perfect for beach lovers and adventure seekers.",
      "price": "₹12,999",
      "image": "https://www.bookingnear.com/storage/package-gallery/large_1-goa-tour-package.jpeg"
    },
    {
      "id": 2,
      "name": "Heritage Discovery Tour",
      "description": "Explore Portuguese architecture, ancient churches, and spice plantations. Ideal for history buffs and culture enthusiasts.",
      "price": "₹15,999",
      "image": "https://www.pelago.com/img/products/IN-India/old-goa-heritage-walk-by-make-it-happen/11443c1d-b991-4419-956c-568b9924771e_old-goa-heritage-walk-by-make-it-happen-medium.jpg"
    },
    {
      "id": 3,
      "name": "Nightlife & Party Package",
      "description": "Dance at the best clubs, enjoy beach parties, and savor authentic Goan cuisine. Perfect for party lovers and food enthusiasts.",
      "price": "₹18,999",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf994EimgW226N6afMKnT51OpN9W8kUHI3xA&s"
    },
    {
      "id": 4,
      "name": "Adventure Sports Special",
      "description": "Try parasailing, scuba diving, jet skiing, and more. Designed for thrill-seekers and adventure enthusiasts.",
      "price": "₹21,999",
      "image": "https://goatourspackage.com/wp-content/uploads/2018/10/scuba-diving-at-malvan-4.jpg"
    },
    {
      "id": 5,
      "name": "Luxury Wellness Retreat",
      "description": "Relax at premium resorts, enjoy spa treatments, and practice yoga by the beach. Perfect for those seeking relaxation.",
      "price": "₹25,999",
      "image": "https://images.moneycontrol.com/static-mcnews/2021/04/Roof-top-pool-2-taj-goa-770x433.jpg?impolicy=website&width=770&height=431"
    }
  ],
  accommodations: [
    {
      "id": 1,
      "name": "JUNGLE by Thehostelcrowd",
      "location": "Palolem",
      "price": "₹1,500/night",
      "rating": "4.5",
      "image": "https://pix8.agoda.net/hotelImages/1196602/-1/fa95905b6619e8ed721f143f1daf0e35.jpg?ca=7&ce=1&s=1024x"
    },
    {
      "id": 2,
      "name": "Red Door Hostel",
      "location": "Anjuna",
      "price": "₹1,200/night",
      "rating": "4.4",
      "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/ae/1e/b9/red-door-hostel.jpg?w=1100&h=-1&s=1"
    },
    {
      "id": 3,
      "name": "Summer Hostel",
      "location": "Palolem",
      "price": "₹1,100/night",
      "rating": "4.3",
      "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/07/f2/c4/caption.jpg?w=1400&h=-1&s=1"
    },
    {
      "id": 4,
      "name": "goSTOPS Goa, Calangute",
      "location": "Calangute",
      "price": "₹1,300/night",
      "rating": "4.2",
      "image": "https://static.ipms247.com/uploads/24733_20211206085212_0834063001638780732_786_7.png"
    },
    {
      "id": 5,
      "name": "Woke Hostel - Arpora",
      "location": "Arpora",
      "price": "₹1,400/night",
      "rating": "4.1",
      "image": "https://media-cdn.tripadvisor.com/media/photo-s/0e/4d/6b/7a/woke-hostel-arpora.jpg"
    },
    {
      "id": 6,
      "name": "ImagiNation - Artists' Hostel Arambol",
      "location": "Arambol",
      "price": "₹1,200/night",
      "rating": "4.0",
      "image": "https://media-cdn.tripadvisor.com/media/photo-s/0e/4d/6b/7a/imagination-artists-hostel.jpg"
    },
    {
      "id": 7,
      "name": "Gaia Hostels",
      "location": "Assagao",
      "price": "₹1,500/night",
      "rating": "4.5",
      "image": "https://media-cdn.tripadvisor.com/media/photo-s/0e/4d/6b/7a/gaia-hostels.jpg"
    },
    {
      "id": 8,
      "name": "La Sea Vue",
      "location": "Palolem",
      "price": "₹1,600/night",
      "rating": "4.6",
      "image": "https://media-cdn.tripadvisor.com/media/photo-s/0e/4d/6b/7a/la-sea-vue.jpg"
    },
    {
      "id": 9,
      "name": "goSTOPS Goa, Baga",
      "location": "Baga",
      "price": "₹1,200/night",
      "rating": "4.2",
      "image": "https://media-cdn.tripadvisor.com/media/photo-s/1c/5e/6e/4b/gostops-goa-baga.jpg"
    },
    {
      "id": 10,
      "name": "Hostel Mandala",
      "location": "Mandrem",
      "price": "₹1,100/night",
      "rating": "4.1",
      "image": "https://media-cdn.tripadvisor.com/media/photo-s/0e/4d/6b/7a/hostel-mandala.jpg"
    },
    {
      "id": 11,
      "name": "Goanvibes Hostel",
      "location": "Anjuna",
      "price": "₹1,300/night",
      "rating": "4.3",
      "image": "https://media-cdn.tripadvisor.com/media/photo-s/0e/4d/6b/7a/goanvibes-hostel.jpg"
    },
    {
      "id": 12,
      "name": "Madpackers Goa Anjuna",
      "location": "Anjuna",
      "price": "₹1,500/night",
      "rating": "4.5",
      "image": "https://media-cdn.tripadvisor.com/media/photo-s/0e/4d/6b/7a/madpackers-goa-anjuna.jpg"
    },
    {
      "id": 13,
      "name": "Dreams Hostel (Vagator)",
      "location": "Vagator",
      "price": "₹1,400/night",
      "rating": "4.4",
      "image": "https://media-cdn.tripadvisor.com/media/photo-s/0e/4d/6b/7a/dreams-hostel-vagator.jpg"
    },
    {
      "id": 14,
      "name": "The Bucket List Goa",
      "location": "Vagator",
      "price": "₹1,300/night",
      "rating": "4.3",
      "image": "https://media-cdn.tripadvisor.com/media/photo-s/0e/4d/6b/7a/the-bucket-list-goa.jpg"
    },
    {
      "id": 15,
      "name": "Rainbow Lining Hostels",
      "location": "Palolem",
      "price": "₹1,200/night",
      "rating": "4.2",
      "image": "https://media-cdn.tripadvisor.com/media/photo-s/0e/4d/6b/7a/rainbow-lining-hostels.jpg"
    },
    {
      "id": 16,
      "name": "Locomo Boutique - Stay | Work | Eat",
      "location": "Morjim",
      "price": "₹1,600/night",
      "rating": "4.6",
      "image": "https://media-cdn.tripadvisor.com/media/photo-s/0e/4d/6b/7a/locomo-boutique.jpg"
    },
    {
      "id": 17,
      "name": "Whoopers Party Hostel, Palolem",
      "location": "Palolem",
      "price": "₹1,100/night",
      "rating": "4.1",
      "image": "https://media-cdn.tripadvisor.com/media/photo-s/0e/4d/6b/7a/whoopers-party-hostel.jpg"
    },
  ],
};

const PlanTrip = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("packages");

  const filteredData = planData[activeTab].filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookBtn = (item) => {
    console.log("Booking details:", item);

    // Assuming the amount is in the form of ₹ (strip the currency and parse as integer)
    const amount = parseInt(item.price.replace(/[^\d]/g, "")) * 100; // Converting to paise

    // Load the Razorpay script dynamically if it's not already loaded
    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = initializeRazorpay;
      document.body.appendChild(script);
    };

    // Initialize Razorpay payment gateway
    const initializeRazorpay = () => {
      const options = {
        key: "", // Your Razorpay key here
        amount: amount, // Amount to be paid (in paise)
        currency: "INR",
        name: "Travel Tinder",
        description: "Booking confirmation for your selected plan",
        image: "https://as2.ftcdn.net/v2/jpg/00/65/48/25/1000_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg", // Optional: image of your brand or logo
        handler: async function (response) {
          // Handle the response from Razorpay
          console.log("Payment successful:", response);

          // Send the payment details (paymentId) to your backend for verification
          const paymentId = response.razorpay_payment_id;
          const orderId = response.razorpay_order_id;
          alert(`Payment successful! Payment ID: ${paymentId}. Order ID: ${orderId}`);
          window.location.href = "/"; // Redirect to the home page
          // Here, you would typically verify the payment with your backend (assuming you have a /verify-payment endpoint)
          // try {
          //   const verificationResponse = await axios.post('http://localhost:3001/api/payment/', {
          //     paymentId,
          //     orderId
          //   });
          //   if (verificationResponse.data.success) {
          //     alert("Payment successfully verified!");
          //   } else {
          //     alert("Payment verification failed.");
          //   }
          // } catch (error) {
          //   alert("Error occurred during payment verification.");
          // }
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

    // If Razorpay script is already loaded, initialize directly
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