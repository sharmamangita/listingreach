import { userConstants } from '../constants';
import {subscriberService} from '../services'
import { alertActions } from '.';
import { history } from '../helpers';
export const subscriberActions = {
    register,
    update,
    getAgentsDatabase,
};

function getAgentsDatabase(state) {
    return dispatch => {
        dispatch(request());
        subscriberService.getAgentsDatabase(state)
            .then(
                () => {
                    return dispatch(success(susbscriber));
                },
                error => dispatch(failure(error.toString()))
            );
    };
    function request(subscriber) { return { type: userConstants.AGENT_DATABASE_REQUEST, subscriber } }
    function success(subscriber) { return { type: userConstants.AGENT_DATABASE_SUCCESS, subscriber } }
    function failure(error) { return { type: userConstants.AGENT_DATABASE_FAILURE, error } }
}
function register(subscriber) {
    return dispatch => {
        dispatch(request(subscriber));
        subscriberService.register(subscriber)
            .then(
                subscriber => {
                    dispatch(success());
                    console.log("user====", subscriber);
                    if (user.error) {
                        dispatch(alertActions.error('This email address is already used, please try with another email.'));
                    } else {
                     //   history.push('/login');
                        dispatch(alertActions.success('Thank you for registration.Please check your inbox for password and login link.'));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error('This email address is already added, please try with another email.'));
                }
            );
    };
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function update(user, employee) {
    return dispatch => {
        dispatch(request(user, employee));
        subscriberService.update(user, employee)
            .then(
                users => {
                    dispatch(success(users));
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


