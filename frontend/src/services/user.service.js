import config from 'config';
import { authHeader } from '../helpers';

export const userService = {
    login,
    forgotpassword,
    logout,
    register,
    getAll,
    getById,
    getVerification,
    update,
    updatepassword,
    contactForm,
    emailPreviewTemplate,
    deleteprofilepic,
    deleteprofileCover,
    delete: _delete,
    getReferences,
    updateStatus,
    unsetsrcid,
    blast,
    saveProperty,
    saveAgents,
    getTemplateOrPropertydata,
    designTemplate,
    savePayment,
    getPayment,
    getSavedBlast,
    getBlast,
    deleteSavedBlast,
    selectDatabase,
    saveImages,
    saveCalenderData,
    getPreviewhtml
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };
    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log("user====", user);
            if (user.token) {
                localStorage.setItem('user', JSON.stringify(user));
                if (user.profilePic) {
                    localStorage.setItem('profileimage', JSON.stringify(user.profilePic));
                }
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }

            return user;
        }).catch(this.handleError);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('profileimage');
    localStorage.removeItem('user');
    //location.reload();
}

function unsetsrcid() {
    localStorage.removeItem("srcid");
}


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getReferences(userid) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid })
    };
    return fetch(`${config.apiUrl}/users/getReferences`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse)
        .then(user => {
            return user;
        }).catch(this.handleError);
}

function getVerification(token) {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${config.apiUrl}/users/verification/${token}`, requestOptions).then(handleResponse);
}
function register(user) {
    console.log("user=====", user);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}


function forgotpassword(email) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    };
    return fetch(`${config.apiUrl}/users/forgetUserPassword`, requestOptions).then(handleResponse)
        .then(user => {
            return user;
        }).catch(this.handleError);
}


/* change password */
function updatepassword(user, currentpassword, newpassword) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, currentpassword, newpassword })
    };
    return fetch(`${config.apiUrl}/users/UpdateUserPassword`, requestOptions).then(handleResponse)
        .then(user => {
            return user;
        }).catch(this.handleError);
}
/* contact form */
function contactForm(fullname, email, phone, message) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, email, phone, message })
    };
    return fetch(`${config.apiUrl}/users/contactForm`, requestOptions).then(handleResponse)
        .then(user => {
            return user;
        }).catch(this.handleError);
}
/* contact form */
function emailPreviewTemplate(email, blast_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, blast_id })
    };
    return fetch(`${config.apiUrl}/users/emailPreviewTemplate`, requestOptions).then(handleResponse)
        .then(user => {
            return user;
        }).catch(this.handleError);
}


function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ user })
    };
    return fetch(`${config.apiUrl}/userUpdate`, requestOptions).then(handleResponse);;
}


function updateStatus(user) {
    console.log("updateStatus121", user);
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ user })
    };
    return fetch(`${config.apiUrl}/updateStatus`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id, flag) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    location.reload();
    return fetch(`${config.apiUrl}/users/${id}/${flag}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                //return data.error;
                var scrollTop = $(window).scrollTop();
                window.scrollTo(0, 0);
                return Promise.reject(data.error);
            }

        }
        return data;
    });
}


function deleteprofilepic(uid) {
    var user = { "userid": uid };
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${config.apiUrl}/users/deleteprofilepic`, requestOptions).then(handleResponse)
        .then(user => {
            return user;
        }).catch(this.handleError);
}

function deleteprofileCover(uid) {
    var user = { "userid": uid };
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${config.apiUrl}/users/deleteprofileCover`, requestOptions).then(handleResponse)
        .then(user => {
            return user;
        }).catch(this.handleError);
}


function getTemplateOrPropertydata(blast_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blast_id })
    };
    return fetch(`${config.apiUrl}/users/propertyDetail`, requestOptions).then(handleResponse);
}

function blast(blast_type, user_id, blastId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blast_type, user_id, blastId })
    };
    return fetch(`${config.apiUrl}/users/saveBlast`, requestOptions).then(handleResponse);
}

function designTemplate(template_type, blastId, templateId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template_type, blastId, templateId })
    };
    return fetch(`${config.apiUrl}/users/saveDesignTemplate`, requestOptions).then(handleResponse);
}


function saveProperty(property, agentData, template, blastId) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ properties: property, agentData, template, blastId })
    };
    return fetch(`${config.apiUrl}/users/saveProperty`, requestOptions).then(handleResponse);
}

function saveAgents(agentData) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(agentData)
    };
    return fetch(`${config.apiUrl}/users/saveAgents`, requestOptions).then(handleResponse)
        .then(user => {
            return user;
        }).catch(this.handleError);

}

function savePayment(payment, blastId) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(payment)
    };
    return fetch(`${config.apiUrl}/users/savePayment/${blastId}`, requestOptions).then(handleResponse);
}

function selectDatabase(blast_id, associations) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ blast_id, associations })
    };
    return fetch(`${config.apiUrl}/users/selectDatabase`, requestOptions).then(handleResponse);
}

function getPayment(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/getPayment/${id}`, requestOptions).then(handleResponse)
        .then(user => {
            return user;
        }).catch(this.handleError);
}

function getSavedBlast(agentId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/users/getSavedBlast/${agentId}`, requestOptions).then(handleResponse)
        .then(user => {
            return user;
        }).catch(this.handleError);
}
function getBlast(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/users/getBlast/${id}`, requestOptions).then(handleResponse)
        .then(user => {
            return user;
        }).catch(this.handleError);
}
function deleteSavedBlast(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/users/deleteSavedBlast/${id}`, requestOptions).then(handleResponse)
        .then(user => {
            return user;
        }).catch(this.handleError);
}

function saveImages(properties) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ properties })
    };
    return fetch(`${config.apiUrl}/users/saveImages`, requestOptions).then(handleResponse);
}




function saveCalenderData(data, blastId) {
    console.log("blast_id=ssssss==", blastId);
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ "data": data })
    };
    return fetch(`${config.apiUrl}/saveBlastCalender/${blastId}`, requestOptions).then(handleResponse)
        .then(user => {
            return user;
        }).catch(this.handleError);

}


function getPreviewhtml(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/users/getPreviewhtml/${id}`, requestOptions).then(handleResponse)
        .then(user => {
            return user;
        }).catch(this.handleError);
}




