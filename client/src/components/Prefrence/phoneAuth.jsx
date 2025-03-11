import React, { useState, useEffect } from "react";
import { Button, Chip, Switch, Typography } from "@mui/material";

const TravelPreferencesForm = ({ formData, setFormData }) => {
  // Provide default values in case formData or formData.travelPreferences is undefined
  const travelPreferencesv1 = formData?.travelPreferencesv1 || {};

  const [travelStyle, setTravelStyle] = useState(travelPreferencesv1.travelStyle || []);
  const [travelCompanion, setTravelCompanion] = useState(travelPreferencesv1.travelCompanion || "");
  const [tripBudget, setTripBudget] = useState(travelPreferencesv1.tripBudget || "");
  const [accommodation, setAccommodation] = useState(travelPreferencesv1.accommodation || []);
  const [transport, setTransport] = useState(travelPreferencesv1.transport || []);
  const [mealPreferences, setMealPreferences] = useState(travelPreferencesv1.mealPreferences || []);
  const [activityInterests, setActivityInterests] = useState(travelPreferencesv1.activityInterests || []);
  const [smoker, setSmoker] = useState(travelPreferencesv1.smoker || false);
  const [drinksAlcohol, setDrinksAlcohol] = useState(travelPreferencesv1.drinksAlcohol || false);

  useEffect(() => {
    // Update the formData with the preferences whenever the state changes
    setFormData({
      ...formData,
      travelPreferencesv1: {
        travelStyle,
        travelCompanion,
        tripBudget,
        accommodation,
        transport,
        mealPreferences,
        activityInterests,
        smoker,
        drinksAlcohol
      }
    });
  }, [
    travelStyle,
    travelCompanion,
    tripBudget,
    accommodation,
    transport,
    mealPreferences,
    activityInterests,
    smoker,
    drinksAlcohol,
    formData,
    setFormData
  ]);

  const handleMultiSelectChips = (value, state, setState) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const handleSingleSelectChips = (value, setState) => {
    setState(value);
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        {[
          {
            title: "Travel Style",
            description: "Select all that match your travel preferences",
            options: [
              "Relaxing",
              "Adventure",
              "Backpacking",
              "City Exploration",
              "Nature & Wildlife",
              "Partying",
              "Beach & Watersport",
              "Wellness & Spiritual",
            ],
            state: travelStyle,
            setState: setTravelStyle,
            multiSelect: true,
          },
          {
            title: "Preferred Travel Companion",
            description: "Choose your preferred partner",
            options: [
              "Solo travelers only",
              "Group travelers",
              "Couples",
              "Open to all",
            ],
            state: travelCompanion,
            setState: setTravelCompanion,
            multiSelect: false,
          },
          {
            title: "Trip Budget",
            description: "Choose your preferred budget range",
            options: [
              "💰 Budget (₹1,000 – ₹5,000)",
              "💸 Mid-range (₹10,000 – ₹15,000)",
              "💎 Luxury (₹20,000+)",
            ],
            state: tripBudget,
            setState: setTripBudget,
            multiSelect: false,
          },
          {
            title: "Accommodation",
            description: "Select your preferred accommodation type",
            options: [
              "Hotels",
              "Hostels",
              "Homestays",
              "Camping",
              "Van Life",
            ],
            state: accommodation,
            setState: setAccommodation,
            multiSelect: true,
          },
          {
            title: "Transport",
            description: "Select your preferred mode of transport",
            options: [
              "Flights",
              "Train",
              "Bus",
              "Road Trip (Self-drive)",
            ],
            state: transport,
            setState: setTransport,
            multiSelect: true,
          },
          {
            title: "Meal Preferences",
            description: "Select your meal preferences",
            options: [
              "Vegetarian",
              "Non-Vegetarian",
              "Vegan",
              "Eggterian",
            ],
            state: mealPreferences,
            setState: setMealPreferences,
            multiSelect: false,
          },
          {
            title: "Activity Interests",
            description: "Select the activities you are interested in",
            options: [
              "Cultural Tours",
              "Trekking and Hiking",
              "Scuba Diving",
              "Nightlife & Parties",
              "Photography",
              "Spiritual",
            ],
            state: activityInterests,
            setState: setActivityInterests,
            multiSelect: true,
          },
        ].map(({ title, description, options, state, setState, multiSelect }) => (
          <div key={title} className="preference-card">
            <div className="card-content">
              <Typography variant="h5" className="card-title">{title}</Typography>
              <Typography variant="body2" className="card-description">{description}</Typography>
              <div className="chip-container">
                {options.map((option) => (
                  <Chip
                    key={option}
                    label={option}
                    onClick={() =>
                      multiSelect
                        ? handleMultiSelectChips(option, state, setState)
                        : handleSingleSelectChips(option, setState)
                    }
                    color={state.includes(option) || state === option ? "primary" : "default"}
                    className="chip"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="preference-card">
          <div className="card-content">
            <Typography variant="h5" className="card-title">Personal Preferences</Typography>
            <div className="switch-container">
              <Typography variant="body1">Smoker</Typography>
              <Switch checked={smoker} onChange={(e) => setSmoker(e.target.checked)} color="primary" />
            </div>
            <div className="switch-container">
              <Typography variant="body1">Drinks Alcohol</Typography>
              <Switch checked={drinksAlcohol} onChange={(e) => setDrinksAlcohol(e.target.checked)} color="primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPreferencesForm;
