import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiInstance = Axios.create({
    baseURL:'https://edp-api.herokuapp.com',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': AsyncStorage.getItem('token') ? AsyncStorage.getItem('token') : null,
    }
});

