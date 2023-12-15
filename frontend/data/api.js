import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:5000'})

export const fetchUser = (username) => API.get(`/user/${username}`);
export const createUser = (newUser) => API.post('/user', newUser);
export const updateUser = (userID, userData) => API.put(`/user/${userID}`, userData)

export default API;