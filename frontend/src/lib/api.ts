import axios from "axios";

const api = axios.create({
    // Note: change to variable version during dev
    baseURL: 'http://127.0.0.1:5000',
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('snipe_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;