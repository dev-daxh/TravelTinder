import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.jsx'; // Import the App component

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);