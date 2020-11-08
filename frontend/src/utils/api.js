import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3001/products',
  headers: {
    'x-api-key': 'apitoken',
  }
});