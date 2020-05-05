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
    updateHr,
    updatepassword,
    contactForm,
    deleteprofilepic,
    deleteprofileCover,
    sendinvite,
    delete: _delete,
    savedCandidates,
    viewdCandidates,
    updateCandidateAmount,
    getSavedCandidates,
    getdownloadedby,
    getapagecontent,
    postreveiws,
    getReferences,
    updateStatus,
    unsetsrcid
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
        if (user.token) {
            localStorage.setItem('user', JSON.stringify(user));
            if(user.profilePic){
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

function unsetsrcid(){
 localStorage.removeItem("srcid");
}

function postreveiws(postreveiws){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postreveiws)
    };
    return fetch(`${config.apiUrl}/users/postreveiw`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getReferences(userid){

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userid})
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
    console.log("user=====",user);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

/*send Invite */
function sendinvite(fullname,email,userid,logInFullname) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({fullname,email,userid,logInFullname})
    };
    return fetch(`${config.apiUrl}/users/sendinvite`, requestOptions).then(handleResponse)
     .then(user => {
        return user;
    }).catch(this.handleError);
}
function forgotpassword(email) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email})
    };
    return fetch(`${config.apiUrl}/users/forgetUserPassword`, requestOptions).then(handleResponse)
    .then(user => {
        return user;
    }).catch(this.handleError);
}
/* change password */
function updatepassword(user,currentpassword,newpassword) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user,currentpassword,newpassword})
    };
    return fetch(`${config.apiUrl}/users/UpdateUserPassword`, requestOptions).then(handleResponse)
    .then(user => {
        return user;
    }).catch(this.handleError);
}
/* contact form */
function contactForm(fullname,email,phone,message){
	    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({fullname,email,phone,message})
    };
    return fetch(`${config.apiUrl}/users/contactForm`, requestOptions).then(handleResponse)
    .then(user => {
        return user;
    }).catch(this.handleError);
	}

function update(id,user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    // location.reload();  
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);;
}
function updateCandidateAmount(user){
     const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    location.reload();
    return fetch(`${config.apiUrl}/updateCandidateAmount`, requestOptions).then(handleResponse);;
}
//update hr
function updateHr(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    if (user.roles=='hr') {
        localStorage.setItem('user', JSON.stringify(user));
    }
    console.log("user.roles=====",user.roles);
    if(user.roles=='admin'){
        location.reload();
    }
    return fetch(`${config.apiUrl}/hrUpdate`, requestOptions).then(handleResponse);;
}
function updateStatus(user) {
    console.log("updateStatus121",user);
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({user})
    };
    return fetch(`${config.apiUrl}/updateStatus`, requestOptions).then(handleResponse);;
}


//viewdCandidates
function viewdCandidates(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${config.apiUrl}/viewdCandidates`, requestOptions).then(handleResponse);;
}

//savedCandidates
function savedCandidates(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${config.apiUrl}/savedCandidates`, requestOptions).then(handleResponse);;
}

// get saved candidates 
function getSavedCandidates() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/getSavedCandidates`, requestOptions).then(handleResponse);
}
//get downloadedby resume
function getdownloadedby(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/getdownloadedby/${id}`, requestOptions).then(handleResponse);
}
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id,flag) {
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
               window.scrollTo(0,0);
               return Promise.reject(data.error);
            }

        }
        return data;
    });
}
   

function deleteprofilepic(uid){
var user = {"userid":uid};
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
	
function deleteprofileCover(uid){
var user = {"userid":uid};
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


function getapagecontent(page) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(page)
    };
    return fetch(`${config.apiUrl}/contentPage`, requestOptions).then(handleResponse);
}	
    
	
