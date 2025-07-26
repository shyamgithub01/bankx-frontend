import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://backend-5z27.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});
