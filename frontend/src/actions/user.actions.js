import { userConstants } from '../constants';
import { userService, adminService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';
import config from 'config';
export const userActions = {
    login,
    forgotpassword,
    logout,
    register,
    update,
    getVerification,
    getAll,
    getById,
    updatepassword,
    contactForm,
    emailPreviewTemplate,
    deleteprofilepic,
    deleteprofileCover,
    delete: _delete,
    getReferences,
    updateStatus,
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
    termsNext,
    saveCalenderData,
    getPreviewhtml,
    moveTab,
    getBlastSettings,
    resetCreateFlyerState
};

function moveTab(tab) {
    return dispatch => {
        dispatch(success(tab));;
    };
    function success(tab) { return { type: userConstants.MOVE_TAB_SUCCESS, tab } }
}
/* Get References */
function getReferences(userid) {
    console.log("userdata");
    return dispatch => {
        dispatch(request(userid));
        userService.getReferences(userid)
            .then(
                users => {
                    dispatch(success(users));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };
    function request(users) { return { type: userConstants.GETALL_REQUEST, users } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETAL_FAILURE, error } }
}
/* end References */
/* 
* this logs in the user and gets the user's details including the menus to be displayed
*/
function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    var currenturl = '';
                    var token = '';
                    console.log("test=====", user.roles);
                    /*if(localStorage.getItem('invitetoken') && localStorage.getItem('invitetoken') !== "undefined"){
                        token = localStorage.getItem('invitetoken');
                        history.push('/PostreviewsPage?ref='+token.replace(/\"/g, ""));
                        localStorage.removeItem("invitetoken");  
                    }*/

                    if (user.roles == 'admin') {
                        history.push('/DashboardPage')
                    }
                    else if (user.roles == 'agents') {
                        history.push('/AgentDashboardPage');
                    }

                    localStorage.removeItem("srcid");
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

/* contact page send email and save db */
function contactForm(fullname, email, phone, message) {
    return dispatch => {
        dispatch(request({ fullname, email, phone, message }));
        userService.contactForm(fullname, email, phone, message)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(alertActions.success('Email has been sent successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function getSavedBlast(agentId) {
    return dispatch => {
        dispatch(request({ agentId }));
        userService.getSavedBlast(agentId)
            .then(
                user => {
                    dispatch(success(user));
                    //dispatch(alertActions.success('Email has been sent successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.SAVEDBLAST_REQUEST, user } }
    function success(user) { return { type: userConstants.SAVEDBLAST_SUCCESS, user } }
    function failure(error) { return { type: userConstants.SAVEDBLAST_FAILURE, error } }
}

function getBlast(Id) {
    return dispatch => {
        dispatch(request({ Id }));
        userService.getBlast(Id)
            .then(
                blast => {
                    dispatch(success(blast));
                    //dispatch(alertActions.success('Email has been sent successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(blast) { return { type: userConstants.GET_BLAST_REQUEST, blast } }
    function success(blast) { return { type: userConstants.GET_BLAST_SUCCESS, blast } }
    function failure(error) { return { type: userConstants.GET_BLAST_FAILURE, error } }
}


/* send preview template email*/
function emailPreviewTemplate(email, propertyDetails) {
    return dispatch => {
        dispatch(request({ email, propertyDetails }));
        userService.emailPreviewTemplate(email, propertyDetails)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(alertActions.success('Email has been sent successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}



/*forgot password*/
function forgotpassword(email) {
    return dispatch => {
        dispatch(request({ email }));
        userService.forgotpassword(email)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(alertActions.success('Email has been sent successfully, please check your password in email.'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
/*logout */
function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}
/*rgister user */

function register(user) {
    return dispatch => {
        dispatch(request(user));
        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    console.log("user====", user);
                    if (user.error) {
                        dispatch(alertActions.error('This email address is already used, please try with another email.'));
                    } else {
                        history.push('/login');
                        dispatch(alertActions.success('Thank you for registration.Please check your inbox for password and login link.'));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}




/*update password */
function updatepassword(user, currentpassword, newspassword) {
    var userroles = user.roles;
    return dispatch => {
        console.log("testuser==", user);
        dispatch(request(user.userId, currentpassword, newspassword));
        userService.updatepassword(user.userId, currentpassword, newspassword)
            .then(
                user => {
                    dispatch(success());
                    if (user.success) {
                        if (userroles == "agents") {

                            //history.push('/AgentDashboardPage');
                            dispatch(alertActions.success('Password has been Updated successfully'));
                        }
                        dispatch(alertActions.success(user.success));
                        window.scrollTo(0, 0);
                    } else {
                        dispatch(alertActions.error(user.error));
                    }
                }

            );
    };
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

/* user update */
function update(user) {
    return dispatch => {
        dispatch(request(user));
        userService.update(user)
            .then(
                users => {
                    console.log("Dsadasdsa=====");
                    //history.push('/AgentDashboardPage');
                    //dispatch(success(users));
                    //if(users.success){

                    //}
                    dispatch(alertActions.success('Updated successfully.'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error('Not updated, please try again.'));
                }
            );
    };
    function request(users) { return { type: userConstants.GETALL_REQUEST, users } }
    function success(users) { return { type: userConstants.UPDATE_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETAL_FAILURE, error } }
}



/* update status */
function updateStatus(status) {
    return dispatch => {
        dispatch(request(status));
        userService.updateStatus(status)
            .then(
                reviewdata => {
                    dispatch(success(reviewdata));
                    dispatch(alertActions.success('Updated successfully.'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error('Not updated, please try again.'));
                }
            );
    };
    function request(reviewdata) { return { type: userConstants.GETREVIEW_REQUEST, reviewdata } }
    function success(reviewdata) { return { type: userConstants.REVIEWUPDATE_SUCCESS, reviewdata } }
    function failure(error) { return { type: userConstants.REVIEW_FAILURE, error } }
}

/* End update status */

function getVerification(token) {
    return dispatch => {
        dispatch(request({ token }));
        userService.getVerification(token)
            .then(
                users => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successfully.'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(users) { return { type: userConstants.REGISTER_REQUEST, users } }
    function success(users) { return { type: userConstants.REGISTER_SUCCESS, users } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function deleteprofilepic(data) {
    return dispatch => {
        userService.deleteprofilepic(data)
            .then(
                users => {
                    dispatch(success());
                    dispatch(alertActions.success('Your Profile image is successfully uploaded.'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(users) { return { type: userConstants.REGISTER_REQUEST, users } }
    function success(users) { return { type: userConstants.REGISTER_SUCCESS, users } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function deleteprofileCover(data) {
    return dispatch => {
        userService.deleteprofileCover(data)
            .then(
                users => {
                    dispatch(success());
                    dispatch(alertActions.success('Your Profile Cover image is successfully uploaded.'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(users) { return { type: userConstants.REGISTER_REQUEST, users } }
    function success(users) { return { type: userConstants.REGISTER_SUCCESS, users } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request({ id }));
        userService.getById(id)
            .then(
                user => {
                    if (user.error) {
                        if (id) {
                            localStorage.setItem("srcid", id)
                        }
                        history.push('/login');
                        dispatch(alertActions.success('Please login first to view candidates profile.'));

                    } else {
                        dispatch(success(user));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }

            );
    };
    function request(user) { return { type: userConstants.GETBYID_REQUEST, user } }
    function success(user) { return { type: userConstants.GETBYID_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETBYID_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());
        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}



// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id, flag) {
    return dispatch => {
        dispatch(request(id, flag));

        userService.delete(id, flag)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };
    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}


function getTemplateOrPropertydata(userId) {
    return dispatch => {
        dispatch(request());
        userService.getTemplateOrPropertydata(userId)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function blast(blast_type, user, blastId) {
    return dispatch => {
        dispatch(request());
        userService.blast(blast_type, user, blastId)
            .then(
                blast => {
                    dispatch(success(blast));
                    if (blast && blast.data && blast.data._id) {
                        dispatch(getBlast(blast.data._id));
                    }
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.BLAST_REQUEST } }
    function success(blast) { return { type: userConstants.BLAST_SUCCESS, blast } }
    function failure(error) { return { type: userConstants.BLAST_FAILURE, error } }

}

function designTemplate(designTemplate, blastId, templateId) {
    return dispatch => {
        dispatch(request());
        userService.designTemplate(designTemplate, blastId, templateId)
            .then(
                users => {
                    dispatch(success(users))
                    if (blastId) {
                        dispatch(getBlast(blastId));
                    }
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.DESIGNTEMPLATE_REQUEST } }
    function success(users) { return { type: userConstants.DESIGNTEMPLATE_SUCCESS, users } }
    function failure(error) { return { type: userConstants.DESIGNTEMPLATE_FAILURE, error } }

}





function saveProperty(property, agentData, template, blast_id) {
    return dispatch => {
        dispatch(request());
        userService.saveProperty(property, agentData, template, blast_id)
            .then(
                users => {
                    dispatch(success(users))
                    if (blast_id) {
                        dispatch(getBlast(blast_id));
                    }
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.PROPERTY_REQUEST } }
    function success(users) { return { type: userConstants.PROPERTY_SUCCESS, users } }
    function failure(error) { return { type: userConstants.PROPERTY_FAILURE, error } }

}
function saveAgents(agentData) {
    console.log("agentData==action===", agentData)
    return dispatch => {
        dispatch(request());
        userService.saveAgents(agentData)
            .then(
                user => {
                    dispatch(success());
                    if (user.success) {
                        dispatch(alertActions.success(user.success));
                        window.scrollTo(0, 0);
                    } else {
                        dispatch(alertActions.error(user.error));
                    }
                }

            );
    };
    function request() { return { type: userConstants.AGENT_REQUEST } }
    function success(users) { return { type: userConstants.AGENT_SUCCESS, users } }
    function failure(error) { return { type: userConstants.AGENT_FAILURE, error } }
}

function savePayment(payment, blastId) {
    return dispatch => {
        dispatch(request());
        userService.savePayment(payment, blastId)
            .then(
                user => {
                    dispatch(success());
                    if (user.success) {
                        history.push('/BillingPage');
                        window.scrollTo(0, 0);
                    } else {
                        dispatch(alertActions.error(user.error));
                    }
                }

            );
    };
    function request() { return { type: userConstants.AGENT_REQUEST } }
    function success(users) { return { type: userConstants.AGENT_SUCCESS, users } }
    function failure(error) { return { type: userConstants.AGENT_FAILURE, error } }
}


function getPayment(id) {
    return dispatch => {
        dispatch(request());
        userService.getPayment(id)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request(users) { return { type: userConstants.GETBYPAYMENTID_REQUEST, users } }
    function success(users) { return { type: userConstants.GETBYPAYMENTID_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETBYPAYMENTID_FAILURE, error } }
}

function getBlastSettings() {
    return dispatch => {
        dispatch(request());
        adminService.getBlastSettings()
            .then(
                blastsettings => dispatch(success(blastsettings)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: userConstants.BLAST_SETTINGS_REQUEST } }
    function success(blastsettings) { return { type: userConstants.BLAST_SETTINGS_SUCCESS, blastsettings } }
    function failure(error) { return { type: userConstants.BLAST_SETTINGS_FAILURE, error } }
}
function selectDatabase(blast_id, associations) {
    return dispatch => {
        dispatch(request());
        userService.selectDatabase(blast_id, associations)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request(users) { return { type: userConstants.SELECTDATABASE_REQUEST, users } }
    function success(users) { return { type: userConstants.SELECTDATABASE_SUCCESS, users } }
    function failure(error) { return { type: userConstants.SELECTDATABASE_FAILURE, error } }
}

function saveImages(properties) {
    return dispatch => {
        dispatch(request());
        userService.saveImages(properties)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request(users) { return { type: userConstants.SAVEIMAGES_REQUEST, users } }
    function success(users) { return { type: userConstants.SAVEIMAGES_SUCCESS, users } }
    function failure(error) { return { type: userConstants.SAVEIMAGES_FAILURE, error } }
}



function deleteSavedBlast(id) {
    return dispatch => {
        dispatch(request());
        userService.deleteSavedBlast(id)
            .then(
                users => {
                    dispatch(success(users))
                    var user = JSON.parse(localStorage.getItem("user"));
                    dispatch(userActions.getSavedBlast(user.userId));
                },
                error => dispatch(failure(error.toString()))
            );
    };
    function request(users) { return { type: userConstants.DELETE_BLAST_REQUEST, users } }
    function success(users) { return { type: userConstants.DELETE_BLAST_SUCCESS, users } }
    function failure(error) { return { type: userConstants.DELETE_BLAST_FAILURE, error } }
}

function termsNext() {
    return dispatch => {
        dispatch(request());
    };
    function request() { return { type: userConstants.TERMS_REQUEST } }
}

function saveCalenderData(data, blastId) {
    return dispatch => {
        dispatch(request());
        userService.saveCalenderData(data, blastId)
            .then(
                users => {
                    dispatch(success(users))
                    dispatch(getBlast(blastId))
                },
                error => dispatch(failure(error.toString()))
            );
    };
    function request(users) { return { type: userConstants.SELECTSETDATE_REQUEST, users } }
    function success(users) { return { type: userConstants.SELECTSETDATE_SUCCESS, users } }
    function failure(error) { return { type: userConstants.SELECTSETDATE_FAILURE, error } }
}

function getPreviewhtml(blastId) {
    return dispatch => {
        dispatch(request());
        userService.getPreviewhtml(blastId)
            .then(
                HTML => dispatch(success(HTML)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: userConstants.GETPREVIEW_REQUEST } }
    function success(HTML) { return { type: userConstants.GETPREVIEW_SUCCESS, HTML } }
    function failure(error) { return { type: userConstants.GETPREVIEW_FAILURE, error } }
}


function resetCreateFlyerState() {
    return dispatch => {
        dispatch(success())
    };
    function success(HTML) { return { type: userConstants.RESET_CREATE_FLYER_STATE, HTML } }
}


