// src/api/constants.js

// Load the base API URL from the .env file
export const BASE_URL = import.meta.env.VITE_API_URL;

console.log("Base URL:", BASE_URL);

// Define all API endpoints relative to BASE_URL
export const ENDPOINTS = {
  BASE_URL_IS: BASE_URL,
  LOGIN: `${BASE_URL}/login`,
  SIGNUP: `${BASE_URL}/admin/dashboard`,


  // Add more endpoints here as needed
};

// ../api/constraints.js
// export const ENDPOINTS = {
//   LOGIN: 'https://your-api-url.com/api/login',
// };
