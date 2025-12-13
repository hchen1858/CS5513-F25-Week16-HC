// Import React library for JSX support and React features
import React from 'react';
// Import createRoot function from react-dom/client for creating a React root (React 18+ API)
import { createRoot } from 'react-dom/client';
// Import the main App component from the App.tsx file
import App from './App';
// Import defineCustomElements function from Ionic PWA Elements loader to register custom web components
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Call defineCustomElements to register Ionic PWA custom elements (like camera modal) in the browser
// This must be called before rendering the app to ensure custom elements are available
defineCustomElements(window);

// Get the root DOM element from the HTML document where the React app will be mounted
const container = document.getElementById('root');
// Create a React root using the container element (non-null assertion since root element should exist)
const root = createRoot(container!);
// Render the App component wrapped in React.StrictMode for development checks and warnings
root.render(
  // React.StrictMode wrapper that enables additional checks and warnings in development mode
  <React.StrictMode>
    {/* Render the main App component as the root of the application */}
    <App />
  </React.StrictMode>
);