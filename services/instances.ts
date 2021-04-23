import Axios from 'axios';

export const loginInstance = Axios.create({ 
    baseURL:'https://edp-api.herokuapp.com',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

