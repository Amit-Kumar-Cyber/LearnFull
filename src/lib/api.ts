import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Proxy handles this to localhost:5000
});

// Request interceptor to add token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized (optional: redirect to login or clear token)
            // localStorage.removeItem('token');
            // window.location.href = '/'; 
        }
        return Promise.reject(error);
    }
);

export default api;
