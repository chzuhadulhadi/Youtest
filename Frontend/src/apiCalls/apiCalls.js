import axios from 'axios';
import { getLocalStorage, deleteLocalStorage } from './localstorage';

export const apiCall = async (method, url, body, token) => {
    attachTokenToHeader(url);

    try {
        let response;

        if (method === 'get') {
            response = await axios.get(url);
        } else if (method === 'post') {
            response = await axios.post(url, body);
        } else if (method === 'put') {
            response = await axios.put(url, body);
        } else {
            response = await axios.delete(url);
        }

        return response;
    } catch (error) {
        if (error.response && error.response.status === 405) {
            console.log('Unauthorized access');
            if(error.response.data.message =='jwt expired') handleUnauthorizedAccess();
        }
        throw error;
    }
};

function attachTokenToHeader(url) {
    const token = getLocalStorage('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}

function handleUnauthorizedAccess() {
    deleteLocalStorage('token'); // Ensure you have this function in your localstorage.js
    window.location.href = '/'; // Redirect to the main page
}
