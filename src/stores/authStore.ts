import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { API_URL } from '../config/constants';

interface User {
  id: number;
  username: string;
  email: string;
}

interface JwtPayload {
  exp: number;
  user_id: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await axios.post(`${API_URL}/auth/login/`, {
            email,
            password,
          });

          const { access, user } = response.data;
          
          // Set auth token in axios defaults
          axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
          
          set({
            token: access,
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: 'Invalid credentials. Please try again.',
            isLoading: false,
            isAuthenticated: false,
          });
        }
      },

      register: async (username, email, password) => {
        try {
          set({ isLoading: true, error: null });
          
          await axios.post(`${API_URL}/auth/register/`, {
            username,
            email,
            password,
          });

          // Auto login after successful registration
          await get().login(email, password);
        } catch (error) {
          set({
            error: 'Registration failed. Please try again.',
            isLoading: false,
          });
        }
      },

      logout: () => {
        // Remove auth token from axios defaults
        delete axios.defaults.headers.common['Authorization'];
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user }),
      onRehydrateStorage: () => (state) => {
        // Check if token is expired
        if (state?.token) {
          try {
            const decoded = jwtDecode<JwtPayload>(state.token);
            const currentTime = Date.now() / 1000;
            
            if (decoded.exp < currentTime) {
              // Token expired, clear auth state
              state.token = null;
              state.user = null;
              state.isAuthenticated = false;
            } else {
              // Token valid, set auth header
              axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
              state.isAuthenticated = true;
            }
          } catch (error) {
            // Invalid token, clear auth state
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
          }
        }
      },
    }
  )
);