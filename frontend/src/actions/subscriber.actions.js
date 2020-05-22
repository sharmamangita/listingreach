import { userConstants, adminConstants } from '../constants';
import { subscriberService } from '../services'
import { alertActions } from '.';
import { history } from '../helpers';
export const subscriberActions = {
    register,
    update,
    getAgentsDatabase,
    getSubscriberPreferences,
};

function getSubscriberPreferences(id) {
    return dispatch => {
        dispatch(request());
        subscriberService.getSubscriberPreferences(id)
            .then(
                subscriberPrefs => {
                    return dispatch(success(subscriberPrefs));
                },
                error => dispatch(failure(error.toString()))
            );
    };
    function request(subscriberPrefs) { return { type: adminConstants.SUB_PREFERENCES_REQUEST, subscriberPrefs } }
    function success(subscriberPrefs) { return { type: adminConstants.SUB_PREFERENCES_SUCCESS, subscriberPrefs } }
    function failure(error) { return { type: adminConstants.SUB_PREFERENCES_FAILURE, error } }
}

function getAgentsDatabase(state) {
    return dispatch => {
        dispatch(request());
        subscriberService.getAgentsDatabase(state)
            .then(
                agentDatabase => {
                    return dispatch(success(agentDatabase));
                },
                error => dispatch(failure(error.toString()))
            );
    };
    function request(agentDatabase) { return { type: userConstants.AGENT_DATABASE_REQUEST, agentDatabase } }
    function success(agentDatabase) { return { type: userConstants.AGENT_DATABASE_SUCCESS, agentDatabase } }
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
                    if (subscriber.error) {
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
    function request(subscriber) { return { type: userConstants.SUBSCRIBER_REQUEST, subscriber } }
    function success(subscriber) { return { type: userConstants.SUBSCRIBER_SUCCESS, subscriber } }
    function failure(error) { return { type: userConstants.SUBSCRIBER_FAILURE, error } }
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


