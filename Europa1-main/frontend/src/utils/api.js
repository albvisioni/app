import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE_URL = `${BACKEND_URL}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('europaToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('europaToken');
      localStorage.removeItem('europaUser');
      window.location.href = '/';
      toast.error('Session expired. Please login again.');
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    }
    return Promise.reject(error);
  }
);

// API methods
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/me'),
};

export const companiesAPI = {
  getAll: () => api.get('/companies'),
  create: (companyData) => api.post('/companies', companyData),
  getById: (id) => api.get(`/companies/${id}`),
  update: (id, updateData) => api.put(`/companies/${id}`, updateData),
  delete: (id) => api.delete(`/companies/${id}`),
  work: (id) => api.post(`/companies/${id}/work`),
};

export const marketAPI = {
  getItems: (params) => api.get('/market/items', { params }),
  buy: (buyRequest) => api.post('/market/buy', buyRequest),
  getInventory: () => api.get('/market/inventory'),
  getExchangeRates: () => api.get('/market/exchange-rates'),
  exchange: (exchangeData) => api.post('/market/exchange', exchangeData),
};

export const warsAPI = {
  getAll: () => api.get('/wars'),
  fight: (warId, side) => api.post(`/wars/${warId}/fight`, { side }),
  getUserStats: () => api.get('/wars/user/stats'),
};

export const trainingAPI = {
  getStats: () => api.get('/training/stats'),
  getOptions: () => api.get('/training/options'),
  train: (skill, trainingType) => api.post(`/training/train/${skill}`, { training_type: trainingType }),
};

export default api;