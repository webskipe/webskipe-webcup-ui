// services/axiosInstance.ts
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { API_URL } from '../config/constants';
import { Navigate } from 'react-router-dom';
import { goTo } from '../navigation';

// const API_BASE_URL = 'https://your-api.com/api'; // Change ceci selon ton backend

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token; // récupère le token depuis Zustand
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token invalide ou accès interdit
      useAuthStore.getState().logout(); // déconnecte l'utilisateur
      // Optionnel : rediriger vers la page de login
      goTo('/login');
      // <Navigate to="/login" replace />;; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
