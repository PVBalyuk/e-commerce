import { showNotification } from 'src/store/slices/notification-slice';
import axios from 'axios'
import {store} from 'src/store/store';
import { API_ENDPOINTS } from './api-modules/api-endpoints';

const BASE_URL = 'http://localhost:5000/api/';

const {dispatch} = store;
export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    
})
api.interceptors.request.use((config) => {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
    }, (error) => {
        return Promise.reject(error)
    });

api.interceptors.response.use((response) => {
    return response
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.USER_ENDPOINTS.REFRESH_TOKENS}`, {withCredentials: true});
        localStorage.setItem('token', response.data.accessToken);
        return api.request(originalRequest)
    } else {
        dispatch(showNotification({
            message: error.response.data.message,
            type: 'danger',
            timeInspiration: 5000,
        }))
    }
    return Promise.reject(error)
})