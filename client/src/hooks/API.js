import axios from 'axios';

const baseUrl = 'http://localhost:3001';

const instance = axios.create({
    baseURL: baseUrl,
    timeout: 15000,
    // withCredentials: true,
})


export default instance;