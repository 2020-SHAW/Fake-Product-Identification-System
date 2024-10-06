import axios from 'axios';

// Define base URL of the backend API (replace with actual URL)
const BASE_URL = 'https://api.fakeproductcheck.com';

// Create an axios instance for API requests
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,  // Set timeout for requests
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Helper function to handle errors
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with a status other than 2xx
    console.error('API Error:', error.response.data.message);
    return {
      success: false,
      message: error.response.data.message || 'An error occurred. Please try again later.',
    };
  } else if (error.request) {
    // Request was made but no response received
    console.error('No response from API:', error.request);
    return {
      success: false,
      message: 'No response from server. Please check your network connection.',
    };
  } else {
    // Something else happened while setting up the request
    console.error('Error setting up request:', error.message);
    return {
      success: false,
      message: 'Error in request setup. Please try again.',
    };
  }
};

// Verify Product API Call
export const verifyProduct = async (qrCodeData) => {
  try {
    // Make a POST request to verify product based on QR code data
    const response = await apiClient.post('/verify', {
      qrCode: qrCodeData,
    });

    // Return successful response
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // Handle API errors
    return handleApiError(error);
  }
};

// Fetch Product Details (for authenticated users or admin)
export const fetchProductDetails = async (productId) => {
  try {
    // Make GET request to retrieve product details
    const response = await apiClient.get(`/products/${productId}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // Handle API errors
    return handleApiError(error);
  }
};

// Authenticate User (e.g., login API for admin)
export const authenticateUser = async (username, password) => {
  try {
    // Send a POST request with login credentials
    const response = await apiClient.post('/auth/login', {
      username,
      password,
    });

    // Assuming the response contains a JWT token
    return {
      success: true,
      token: response.data.token,
    };
  } catch (error) {
    // Handle API errors
    return handleApiError(error);
  }
};

// Generic GET request 
export const getData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
};

// Generic POST request 
export const postData = async (endpoint, payload) => {
  try {
    const response = await apiClient.post(endpoint, payload);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
};

