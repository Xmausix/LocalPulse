/**
 * Auth0 Configuration
 * 
 * IMPORTANT: Replace these values with your Auth0 application credentials.
 * These are public/publishable values (safe to store in code).
 * 
 * 1. Go to https://manage.auth0.com
 * 2. Create a Single Page Application
 * 3. Set Allowed Callback URLs, Logout URLs, and Web Origins to your app URL
 * 4. Copy Domain and Client ID below
 */
export const AUTH0_CONFIG = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || "YOUR_AUTH0_DOMAIN.auth0.com",
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || "YOUR_AUTH0_CLIENT_ID",
  audience: import.meta.env.VITE_AUTH0_AUDIENCE || "https://pulsenews-api.example.com",
  redirectUri: window.location.origin,
};

/**
 * External Backend API URL
 * The frontend communicates with this backend for all data operations.
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

/**
 * Admin emails — users with these emails get admin role.
 * In production, roles should come from the backend database via /api/me endpoint.
 */
export const ADMIN_EMAILS: string[] = [
  // Add admin emails here as a fallback, but prefer backend role assignment
];
