import config from 'config';
import { authHeader } from '../helpers';

export const adminService = {
    deleteusers,
    userStatus,
    PlanRegister,
    getPlan,
    getBlastSettings,
    updatecontent,
    getContent,
    getCount,
    updateBlastSettings,
    getAgents,
    getSubscribers,
    getBlasts,
    deletesubscriber,
    subscriberStatus
};

function updateBlastSettings( blastsettings) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(blastsettings)
    };
    // location.reload();  
    return fetch(`${config.apiUrl}/adminuser/updateblastsettings`, requestOptions).then(handleResponse);;
}
function getAgents() {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${config.apiUrl}/adminusers/agents`, requestOptions).then(handleResponse);
}

function getSubscribers() {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${config.apiUrl}/adminusers/subscribers`, requestOptions).then(handleResponse);
}

function getBlasts() {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${config.apiUrl}/adminusers/blasts`, requestOptions).then(handleResponse);
}

function deleteusers(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    location.reload();
    return fetch(`${config.apiUrl}/adminusers/${id}`, requestOptions).then(handleResponse);
}

function deletesubscriber(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    location.reload();
    return fetch(`${config.apiUrl}/adminusers/deletesubscriber/${id}`, requestOptions).then(handleResponse);
}

function userStatus(id) {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${config.apiUrl}/userStatus/${id}`, requestOptions).then(handleResponse)

        .then(user => {
            location.reload();
            return user;
        }).catch(this.handleError)
}
function subscriberStatus(id) {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${config.apiUrl}/adminuser/subscriberstatus/${id}`, requestOptions).then(handleResponse)

        .then(user => {
            location.reload();
            return user;
        }).catch(this.handleError)
}

function PlanRegister(user) {
    console.log("user service=====", user);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${config.apiUrl}/adminusers/PlanRegister`, requestOptions).then(handleResponse);
}

function getPlan() {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${config.apiUrl}/adminusers/plan`, requestOptions).then(handleResponse);
}
function getBlastSettings() {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${config.apiUrl}/adminusers/blastsettings`, requestOptions).then(handleResponse);
}

function updatecontent(page, content) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, content })
    };
    return fetch(`${config.apiUrl}/adminusers/updateContent`, requestOptions).then(handleResponse);
}


function getContent() {

    const requestOptions = {
        method: 'GET'
        /* headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({flag}) 
        body: JSON.stringify({flag}) */
    };
    console.log(requestOptions);
    return fetch(`${config.apiUrl}/adminusers/getContent`, requestOptions).then(handleResponse);
}

function handleResponse(response) {

    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                //return data.error;
                //     var scrollTop = $(window).scrollTop();
                window.scrollTo(0, 0);
                return Promise.reject(data.error);
            }

        }
        console.log("data====", data);
        return data;
    });
}

function getCount(flag) {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${config.apiUrl}/adminusers/counts/${flag}`, requestOptions).then(handleResponse);
}

