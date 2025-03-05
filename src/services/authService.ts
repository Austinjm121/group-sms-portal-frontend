import axios from 'axios';
import { UserCredentials, UserRegistration, AuthResponse } from '../types/User';

const API_URL = process.env.REACT_APP_API_URL;

export const authService = {
  async login(credentials: UserCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  },

  async register(userData: UserRegistration): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  },

  async microsoftAdLogin(idToken: string, accessToken: string): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/microsoft-ad-login`, {
        idToken,
        accessToken
      });
      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      console.error('Microsoft AD login failed', error);
      throw error;
    }
  },

  logout(): void {
    // Remove token from localStorage
    localStorage.removeItem('token');
  },

  getCurrentUser(): AuthResponse | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      // Decode JWT token to get user info (you might want to use a library like jwt-decode)
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Failed to get current user', error);
      return null;
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
};