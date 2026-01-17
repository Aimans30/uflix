import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add Clerk session token
api.interceptors.request.use(
  async (config) => {
    // Get Clerk session token
    if (typeof window !== 'undefined' && window.Clerk) {
      try {
        // Use the correct method to get the session token
        const session = window.Clerk.session;
        if (session) {
          const token = await session.getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
      } catch (error) {
        // Silently handle token errors
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't automatically redirect on 401 - let components handle auth
    return Promise.reject(error);
  }
);

export default api;
