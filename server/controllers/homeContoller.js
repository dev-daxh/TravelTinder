const express = require("express");
const db = require("../config/firebase");

const getProfile = async (req, res) => {
  try {
    // Reference to the users' profiles in Realtime Database
    const usersRef = db.ref("users");

    // Fetch all users' profiles from Firebase
    const usersSnapshot = await usersRef.once("value");

    if (!usersSnapshot.exists()) {
      console.log("No profiles found");
      return res.status(404).json({ message: "No profiles found" });
    }

    // Extract the user profiles data
    const usersData = usersSnapshot.val();
    console.log("All users data done");

    // Return the profiles data in the response
    return res.status(200).json({ profiles: usersData });
  } catch (error) {
    console.error("Error fetching user profiles:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getMatchingData = async (req, res) => {
  try {
    // Get current user's email from query params or from the request body
    const { email } = req.body; // Assuming email is passed as a URL parameter

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Reference to the users' profiles in Firebase Realtime Database
    const usersRef = db.ref("users");

    // Fetch all user profiles from Firebase
    const usersSnapshot = await usersRef.once("value");

    if (!usersSnapshot.exists()) {
      console.log("No profiles found");
      return res.status(404).json({ message: "No profiles found" });
    }

    // Extract the users data from the snapshot
    const usersData = usersSnapshot.val();

    // Find the current user's profile
    const currentUserProfile = usersData[email.replace(".", "_")]; // Transform email to match Firebase path
    if (!currentUserProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    // Return the profile and preferences for the current user
    console.log("user prefrence data is sending to response");
    return res.status(200).json({
      travelPreferencesv1: currentUserProfile.travelPreferencesv1,
      travelPreferencesv2: currentUserProfile.travelPreferencesv2,
    });
  } catch (error) {
    console.error("Error fetching user profiles:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addChat = async (req, res) => {
  const { email, data } = req.body;

  if (!email || !data) {
    return res.status(400).json({ message: "Email and data are required" });
  }

  try {
    const userId = email.replace(/\./g, '_');
    const userRef = db.ref(`users/${userId}`);

    const userSnapshot = await userRef.once('value');

    if (!userSnapshot.exists()) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingUser = userSnapshot.val();

    const chatCount = existingUser.chat ? Object.keys(existingUser.chat).length : 0;
    const chatKey = `c${chatCount + 1}`;
    console.log('Generated chat key:', chatKey);

    // Update chat
    const updatedChat = {
      ...existingUser.chat,
      [chatKey]: data,
    };

    await userRef.update({ chat: updatedChat });

  

    return res.status(200).json({
      message: "Chat added successfully",
      chat: updatedChat,
    });

  } catch (error) {
    console.error("Error adding chat:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


const getChatData = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Step 1: Get the current user’s chat data
    const userId = email.replace(/\./g, '_');
    const userRef = db.ref(`users/${userId}`);
    const userSnapshot = await userRef.once('value');

    if (!userSnapshot.exists()) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingUser = userSnapshot.val();
    const chatData = existingUser.chat || {};

    // Step 2: Extract all emails from chat data
    const matchedEmails = Object.values(chatData);
    if (matchedEmails.length === 0) {
      return res.status(200).json({
        message: "No chats yet",
        chatUsers: [],
      });
    }

    // Step 3: Fetch all users data
    const usersRef = db.ref('users');
    const usersSnapshot = await usersRef.once('value');

    if (!usersSnapshot.exists()) {
      return res.status(404).json({ message: 'No users found in database' });
    }

    const allUsers = usersSnapshot.val();

    // Step 4: Filter only matched profiles using email
    const matchedProfiles = matchedEmails
      .map(email => {
        const uid = email.replace(/\./g, '_');
        return allUsers[uid] ? { email, ...allUsers[uid] } : null;
      })
      .filter(profile => profile !== null);

    return res.status(200).json({
      message: "Matched chat profiles fetched successfully",
      profiles: matchedProfiles,
    });

  } catch (error) {
    console.error("Error fetching chat data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = {
  getProfile,
  getMatchingData,
  addChat,
  getChatData
};
