// src/services/auth.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // Replace with your Django API URL

export const register = async (username, email, password, firstName, lastName) => {
  const response = await axios.post(`${API_URL}/register/`, {
    username,
    email,
    password,
    first_name: firstName,
    last_name: lastName
  });
  return response.data;
};

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login/`, {
    username,
    password
  });
  if (response.data.access) {
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};
