import React, { useState, useEffect } from "react";
import "./phoneAuth.css";
import { Button, Chip, Typography } from "@mui/material";

const TravelPreferencesFormV2 = ({ formData, setFormData }) => {
  // Provide default values in case formData or formData.travelPreferences is undefined
  const travelPreferencesv2 = formData?.travelPreferencev2 || {};

  const [preferredDuration, setPreferredDuration] = useState(travelPreferencesv2.preferredDuration || null);
  const [communicationStyle, setCommunicationStyle] = useState(travelPreferencesv2.communicationStyle || null);
  const [travelGoals, setTravelGoals] = useState(travelPreferencesv2.travelGoals || []);
  const [languagesSpoken, setLanguagesSpoken] = useState(travelPreferencesv2.languagesSpoken || []);
  const [ageRange, setAgeRange] = useState(travelPreferencesv2.ageRange || []);
  const [genderPreference, setGenderPreference] = useState(travelPreferencesv2.genderPreference || null);
  const [availability, setAvailability] = useState(travelPreferencesv2.availability || null);
  const [experienceLevel, setExperienceLevel] = useState(travelPreferencesv2.experienceLevel || null);
  const [safetyPreferences, setSafetyPreferences] = useState(travelPreferencesv2.safetyPreferences || null);

  useEffect(() => {
    // Update the formData with the preferences whenever the state changes
    setFormData({
      ...formData,
      travelPreferencesv2: {
        preferredDuration,
        communicationStyle,
        travelGoals,
        languagesSpoken,
        ageRange,
        genderPreference,
        availability,
        experienceLevel,
        safetyPreferences
      }
    });
  }, [
    preferredDuration,
    communicationStyle,
    travelGoals,
    languagesSpoken,
    ageRange,
    genderPreference,
    availability,
    experienceLevel,
    safetyPreferences,
    formData,
    setFormData
  ]);

  // Handle single selection chips
  const handleSingleSelectChips = (value, setState) => {
    setState(value);
  };

  const handleMultiSelectChips = (value, state, setState) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        {[
          {
            title: "Preferred Travel Duration",
            description: "Select your preferred travel duration",
            options: [
              "⏳ Weekend Trips (1–3 days)",
              "🗓️ Short Trips (4–7 days)",
              "📆 Long Trips (7+ days)",
            ],
            state: preferredDuration,
            setState: setPreferredDuration,
            multiSelect: false,
          },
          {
            title: "Communication Style",
            description: "Choose your communication style",
            options: [
              "💬 Chat frequently",
              "📷 Share photos & videos",
              "🤫 Prefer minimal chat",
            ],
            state: communicationStyle,
            setState: setCommunicationStyle,
            multiSelect: false,
          },
          {
            title: "Travel Goals",
            description: "Select your travel goals",
            options: [
              "👫 Make new friends",
              "🗺️ Explore new places",
              "📸 Create memories",
              "💼 Business & Networking",
            ],
            state: travelGoals,
            setState: setTravelGoals,
            multiSelect: true,
          },
          {
            title: "Languages Spoken",
            description: "Select your preferred spoken language",
            options: [
              "English",
              "Hindi",
              "Regional (e.g., Marathi, Tamil, Bengali)",
            ],
            state: languagesSpoken,
            setState: setLanguagesSpoken,
            multiSelect: true,
          },
          {
            title: "Age Range of Travel Partner",
            description: "Select your preferred age range of travel partner",
            options: [
              "18–25",
              "26–35",
              "36–45",
              "46+",
              "No Preference",
            ],
            state: ageRange,
            setState: setAgeRange,
            multiSelect: true,
          },
          {
            title: "Gender Preference for Companion",
            description: "Select your preferred gender of companion",
            options: [
              "🚹 Male",
              "🚺 Female",
              "🧑 No preference",
              "🏳️‍🌈 LGBTQ+ friendly",
            ],
            state: genderPreference,
            setState: setGenderPreference,
            multiSelect: false,
          },
          {
            title: "Availability for Trips",
            description: "Select your preferred availability for trips",
            options: [
              "🗓️ Weekends only",
              "🗓️ Weekdays only",
              "🗓️ Anytime",
            ],
            state: availability,
            setState: setAvailability,
            multiSelect: false,
          },
          {
            title: "Travel Experience Level",
            description: "Select your travel experience level",
            options: [
              "🌱 Beginner",
              "🧳 Intermediate",
              "🦉 Experienced Traveler",
            ],
            state: experienceLevel,
            setState: setExperienceLevel,
            multiSelect: false,
          },
          {
            title: "Safety Preferences",
            description: "Select your safety preferences",
            options: [
              "🛡️ Prefer only verified users",
              "🚶 Prefer female-only groups (if applicable)",
              "🗓️ Anytime",
            ],
            state: safetyPreferences,
            setState: setSafetyPreferences,
            multiSelect: false,
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
                    color={multiSelect ? (state.includes(option) ? "primary" : "default") : (state === option ? "primary" : "default")}
                    className="chip"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelPreferencesFormV2;
