import config from 'config';
import { authHeader } from '../helpers';

export const subscriberService = {
    register,
    getAll,
    update,
    newSubscriber
};

function newSubscriber() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${config.apiUrl}/subscriber/new`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function register(subscriber) {
    console.log("user=====", subscriber);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscriber)
    };
    return fetch(`${config.apiUrl}/subscriber/register`, requestOptions).then(handleResponse);
}

function update(id, user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    // location.reload();  
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);;
}


function handleResponse(response) {

    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                //   window.scrollTo(0, 0);
                return Promise.reject(data.error);
            }
        }
        return data;
    });
}
