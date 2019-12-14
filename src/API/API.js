import axios from 'axios';
import gs from "querystring";

export const GetToken = async (hello) => {
    let response = await axios.post(`https://jogtracker.herokuapp.com/api/v1/auth/uuidLogin`, {uuid: hello});

    return response.data.response.access_token;
};

const requestWrapper = (token = null) => {
    let baseURL = `https://jogtracker.herokuapp.com/api/v1/`;
    const defaultOptions = {

        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    return {
        get: (url, options = {}) => axios.get(baseURL + url, {...defaultOptions, ...options}),
        post: (url, data, options = {}) => axios.post(baseURL + url, data, {...defaultOptions, ...options}),
        put: (url, data, options = {}) => axios.put(baseURL + url, data, {...defaultOptions, ...options}),
        delete: (url, options = {}) => axios.delete(baseURL + url, {...defaultOptions, ...options}),
    };
};

export const authAPI = {
    getCurrentUser: (token) => requestWrapper(token).get(`auth/user`).then(response => response.data.response),
    getDataCurrentUser: (token) => requestWrapper(token).get(`data/sync?count=4`).then(response => response.data.response.jogs),
    addNewJog: (token, jog) => requestWrapper(token).post(`data/jog`, gs.stringify(jog)).then(response => response.data.response),
};