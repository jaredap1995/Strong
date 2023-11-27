import axios from 'axios';

const API = axios.create({ baseURL: 'httphttp://localhost:5000'})

export const fetchUser = (username) => API.get(`/user/${username}`);
export const createUser = (newUser) => API.post('/user', newUser);

export default API;