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
        const token = await AsyncStorage.getItem('token')
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    error => { return Promise.reject(error); }
)
