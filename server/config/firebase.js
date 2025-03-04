// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import 'firebase/storage';
import 'firebase/database'; // Add this import for Realtime Database
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9xeqNwEHU2VqkiRRDG2xO6MfljkxPROY",
  authDomain: "traveltinder-e2e1f.firebaseapp.com",
  databaseURL: "https://traveltinder-e2e1f-default-rtdb.firebaseio.com",
  projectId: "traveltinder-e2e1f",
  storageBucket: "traveltinder-e2e1f.firebasestorage.app",
  messagingSenderId: "177531076925",
  appId: "1:177531076925:web:f89e787249789850e40554",
  measurementId: "G-379KPXS0TV"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const database = firebase.database(); // Initialize Realtime Database

export { storage, database };