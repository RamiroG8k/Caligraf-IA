import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiInstance = Axios.create(
    {
        baseURL: 'https://edp-api.herokuapp.com',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }
);

apiInstance.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    error => { return Promise.reject(error); }
)

export const ocrInstance = Axios.create(
    {
        baseURL: 'http://127.0.0.1:5000',
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }
);

ocrInstance.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    error => { return Promise.reject(error); }
)
