import axios from 'axios';
import gs from "querystring";

const baseURL = `https://jogtracker.herokuapp.com/api/v1/`;

export const GetToken = async (hello) => {
    let response = await axios.post(baseURL + `auth/uuidLogin`, {uuid: hello});
    return response.data.response.access_token;
};

const requestWrapper = (token = null) => {
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

export const API = {
    getCurrentUser: (token) => requestWrapper(token).get(`auth/user`).then(response => response.data.response),
    getDataCurrentUser: (token) => requestWrapper(token).get(`data/sync?count=4`).then(response => response.data.response.jogs),
    addNewJog: (token, jog) => requestWrapper(token).post(`data/jog`, gs.stringify(jog)).then(response => response.data.response),
    updateJog: (token, newJog) => requestWrapper(token).put(`data/jog`, gs.stringify(newJog)).then(response => response.data.response),

    deleteJog: (token, jogId, userId) => requestWrapper(token).delete(`data/jog?jog_id=${jogId}&user_id=${userId}`),
    sendFeedback: (token, body) => requestWrapper(token).post(`feedback/send`, gs.stringify(body)),
};

export const apiTest = {
    get: (url, options = {}) => axios.get(baseURL + `test/echo`, {...options}),
    post: (url, data, options = {}) => axios.post(baseURL + `test/echo`, data, {...options}),
    put: (url, data, options = {}) => axios.put(baseURL + `test/echo`, data, {...options}),
    delete: (url, options = {}) => axios.delete(baseURL + `test/echo`, {...options}),
};