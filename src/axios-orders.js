import axios from 'axios';

const instance  = axios.create({
    baseURL : 'https://makemyburger-2dfac.firebaseio.com/'
});

export default instance;
