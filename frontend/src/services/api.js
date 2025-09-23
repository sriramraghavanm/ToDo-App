import axios from 'axios';

const API = axios.create({ 
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
  timeout: 10000 // 10 second timeout
});

// Set the baseURL explicitly for development
if (process.env.NODE_ENV === 'development') {
  API.defaults.baseURL = 'http://localhost:5001/api';
}

API.interceptors.request.use((req) => {
  console.log('🌐 API Request:', {
    method: req.method.toUpperCase(), 
    url: req.url, 
    baseURL: API.defaults.baseURL,
    data: req.data
  });
  
  if (localStorage.getItem('token')) {
    req.headers['x-auth-token'] = localStorage.getItem('token');
  }
  return req;
});

API.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status, 
      url: response.config.url 
    });
    return response;
  },
  (error) => {
    console.error('❌ API Error Details:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      code: error.code // This is key for network errors
    });
    
    // Handle 401 (Unauthorized) - redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Named exports
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const createTask = (data) => API.post('/tasks', data);
export const getTasks = () => API.get('/tasks');
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);