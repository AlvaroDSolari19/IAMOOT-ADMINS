import axios from 'axios'; 

const api = axios.create({baseURL: import.meta.env.VITE_API_BASE_URL});

api.interceptors.request.use((requestConfig) => {
    const storedToken = localStorage.getItem('authToken'); 
    if (storedToken) requestConfig.headers.Authorization = `Bearer ${storedToken}`
    return requestConfig; 
});

export default api; 