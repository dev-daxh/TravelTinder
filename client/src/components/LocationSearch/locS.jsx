import React, { useState, useEffect } from "react";
import "./locS.css";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
const locationsData = [
  { id: 1, name: "Hampi" },
  { id: 2, name: "Kalsubai" },
  { id: 3, name: "Meghalaya" },
  { id: 4, name: "Goa" },
  { id: 5, name: "Jaipur" },
  { id: 6, name: "Kerala" },
  { id: 7, name: "Leh-Ladakh" },
  { id: 8, name: "Andaman & Nicobar Islands" },
  { id: 9, name: "Agra" },
  { id: 10, name: "Darjeeling" },
  { id: 11, name: "Rishikesh" },
  { id: 12, name: "Varanasi" },
  { id: 13, name: "Sikkim" },
  { id: 14, name: "Mysore" },
  { id: 15, name: "Coorg" },
  { id: 16, name: "Shimla" },
  { id: 17, name: "Manali" },
  { id: 18, name: "Udaipur" },
  { id: 19, name: "Tiruvannamalai" },
  { id: 20, name: "Jaisalmer" },
  { id: 21, name: "Ziro Valley" },
  { id: 22, name: "Spiti Valley" },
  { id: 23, name: "Tawang" },
  { id: 24, name: "Dhanushkodi" },
  { id: 25, name: "Majuli Island" },
  { id: 26, name: "Chopta" },
  { id: 27, name: "Pondicherry" },
  { id: 28, name: "Kanha National Park" },
  { id: 29, name: "Chikmagalur" },
  { id: 30, name: "Gulmarg" },
  { id: 31, name: "Khajjiar" },
  { id: 32, name: "Lachen" },
  { id: 33, name: "Nanda Devi National Park" },
  { id: 34, name: "Pondicherry" },
  { id: 35, name: "Kanha National Park" },
  { id: 36, name: "Alleppey" },
  { id: 37, name: "Kanha National Park" },
  { id: 38, name: "Cherrapunji" },
  { id: 39, name: "Rajasthan's Shekhawati Region" },
  { id: 40, name: "Bundi" },
  { id: 41, name: "Dholavira" },
  { id: 42, name: "Mawlynnong Village" },
  { id: 43, name: "Gokarna" },
  { id: 44, name: "Kanha National Park" },
  { id: 45, name: "Varkala" },
  { id: 46, name: "Bhedaghat" },
  { id: 47, name: "Tirthan Valley" },
  { id: 48, name: "Kanha National Park" },
  { id: 49, name: "Rishikesh" },
  { id: 50, name: "Nanda Devi National Park" }
];

const LocationSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedLocations, setDisplayedLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate
  // Load more locations as the user scrolls
  const loadMoreLocations = () => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Find the next set of locations to show
    const filteredLocations = locationsData.filter((location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const nextLocations = filteredLocations.slice(displayedLocations.length, displayedLocations.length + 10);
    
    if (nextLocations.length > 0) {
      setDisplayedLocations((prev) => [...prev, ...nextLocations]);
    } else {
      setHasMore(false); // No more locations to show
    }

    setLoading(false);
  };

  // Handle the search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setDisplayedLocations([]); // Reset the displayed locations when the search query changes
    setHasMore(true); // Ensure there are more locations to load
    loadMoreLocations(); // Reload locations based on the new query
  };

  // Handle scroll event to load more locations when the user reaches the bottom
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom) {
      loadMoreLocations();
    }
  };

  useEffect(() => {
    loadMoreLocations(); // Initial load of locations when the component is mounted
  }, []);

  const handelClickedLocation = (e) => {
    const locationName = e.target.innerText;
    // Save the searched location to localStorage
    localStorage.setItem("searchedLocation", locationName);
    // Redirect to the booking page
    window.location.href = "/book";
  };

  const handleBack = () => {
    // Redirect to the previous page
    navigate('/home');
  }
  
  return (
    <div className="location-container" onScroll={handleScroll}>
      {/* Header */}
      <header className="location-header">
        <button onClick={handleBack} className="back-button">&#8592;</button>
        <h2>Search Locations</h2>
      </header>

      {/* Search Input */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for Location..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Locations List */}
      <div className="location-list">
        {displayedLocations.map((location, index) => (
          <div key={`${location.id}-${index}`} className="location-item" onClick={handelClickedLocation}>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/000/279/492/small/10.jpg"
              alt={location.name}
              className="location-img"
            />
            <span className="location-name">{location.name}</span>
          </div>
        ))}
        {loading && <div className="loading">Loading...</div>}
        {!hasMore && <div className="no-more">No more locations available.</div>}
      </div>
    </div>
  );
};

export default LocationSearch;
