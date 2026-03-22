/**
 * API Configuration
 * 
 * In development, this defaults to http://localhost:5000
 * In production, it uses the VITE_API_URL environment variable
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ROUTES = {
  ANALYZE: `${API_BASE_URL}/api/analyze`,
  CHAT: `${API_BASE_URL}/api/chat`,
  COMPILE: `${API_BASE_URL}/api/compiler/compile`,
};
