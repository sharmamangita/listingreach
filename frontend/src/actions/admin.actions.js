import { adminConstants } from '../constants';
import { adminService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';


export const adminActions = {
    deleteusers,
    userStatus,
    PlanRegister,
    getPlan,
    getBlastSettings,
    updatecontent,
    getContent,
    getAlldashboardData,
    update,
    updateBlastSettings,
    getAgents,
    getSubscribers
};

function updateBlastSettings(blastsetting) {
    return dispatch => {
        dispatch(request(blastsetting));
        console.log('updating...', blastsetting);
        adminService.updateBlastSettings(blastsetting.id, blastsetting)
            .then(
                prices => {
                    dispatch(success(blastsetting));
                    location.reload();
                    dispatch(alertActions.success('Updated successfully.'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error('Not updated, please try again.'));
                }
            );
    };
    function request(blastsettings) { return { type: adminConstants.GETALL_REQUEST } }
    function success(blastsettings) { return { type: adminConstants.UPDATE_SUCCESS, blastsettings } }
    function failure(error) { return { type: adminConstants.GETAL_FAILURE, error } }
}

function update(user, employee) {
    return dispatch => {
        dispatch(request(user, employee));
        adminService.update(user, employee)
            .then(
                admins => {
                    dispatch(success(admins));
                    location.reload();
                    dispatch(alertActions.success('Updated successfully.'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error('Not updated, please try again.'));
                }
            );
    };
    function request(admins) { return { type: adminConstants.GETALL_REQUEST } }
    function success(admins) { return { type: adminConstants.UPDATE_SUCCESS, admins } }
    function failure(error) { return { type: adminConstants.GETAL_FAILURE, error } }
}
function getAgents() {
    return dispatch => {
        dispatch(request());
        adminService.getAgents()
            .then(
                agents => dispatch(success(agents)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: adminConstants.AGENTS_REQUEST } }
    function success(agents) { return { type: adminConstants.AGENTS_SUCCESS, agents } }
    function failure(error) { return { type: adminConstants.AGENTS_FAILURE, error } }
}

function getSubscribers() {
    return dispatch => {
        dispatch(request());
        adminService.getSubscribers()
            .then(
                subscribers => dispatch(success(subscribers)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: adminConstants.SUBSCRIBERS_REQUEST } }
    function success(subscribers) { return { type: adminConstants.SUBSCRIBERS_SUCCESS, subscribers } }
    function failure(error) { return { type: adminConstants.SUBSCRIBERS_FAILURE, error } }
}

function deleteusers(id) {
    return dispatch => {
        dispatch(request(id));
        adminService.deleteusers(id)
            .then(
                admins => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: adminConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: adminConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: adminConstants.DELETE_FAILURE, id, error } }
}

function userStatus(id) {
    return dispatch => {
        dispatch(request({ id }));
        adminService.userStatus(id)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }

            );
    };

    function request(user) { return { type: adminConstants.GETBYID_REQUEST, user } }
    function success(user) { return { type: adminConstants.GETBYID_SUCCESS, user } }
    function failure(error) { return { type: adminConstants.GETBYID_FAILURE, error } }
}

function PlanRegister(user) {
    return dispatch => {
        dispatch(request(user));
        adminService.PlanRegister(user)
            .then(
                user => {
                    dispatch(success());
                    console.log("user==========>", user)
                    if (user.success) {
                        dispatch(alertActions.success(user.success));
                    } else {
                        dispatch(alertActions.error(user.error));
                    }
                }

            );
    };

    function request(user) { return { type: adminConstants.PLAN_REQUEST, user } }
    function success(user) { return { type: adminConstants.PLAN_SUCCESS, user } }
    function failure(error) { return { type: adminConstants.PLAN_FAILURE, error } }
}

function getPlan() {
    return dispatch => {
        dispatch(request());
        adminService.getPlan()
            .then(
                admins => dispatch(success(admins)),
                error => dispatch(failure(error.toString()))
            );
    };
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
    function request() { return { type: adminConstants.BLAST_SETTINGS_REQUEST } }
    function success(blastsettings) { return { type: adminConstants.BLAST_SETTINGS_SUCCESS, blastsettings } }
    function failure(error) { return { type: adminConstants.BLAST_SETTINGS_FAILURE, error } }
}

function updatecontent(page, conent) {
    return dispatch => {
        dispatch(request());
        adminService.updatecontent(page, conent)
            .then(
                admins => {
                    dispatch(success(admins));
                    dispatch(alertActions.success('Content updated successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    }

    function request() { return { type: adminConstants.CONTENT_REQUEST } }
    function success(admins) { return { type: adminConstants.GETCONTENT_SUCCESS, admins } }
    function failure(error) { return { type: adminConstants.CONTENT_FAILURE, error } }
}


function getContent() {
    return dispatch => {
        dispatch(request());
        var userdat = adminService.getContent()
            .then(
                admins => dispatch(success(admins)),
                error => dispatch(failure(error.toString()))
            );
        console.log("returndatacontent", userdat);
    };
    function request() { return { type: adminConstants.GETCONTENT_REQUEST } }
    function success(admins) { return { type: adminConstants.GETCONTENT_SUCCESS, admins } }
    function failure(error) { return { type: adminConstants.GETCONTENT_FAILURE, error } }
}


function getAlldashboardData() {
    return dispatch => {
        dispatch(request());
        adminService.getAlldashboardData()
            .then(
                dashboardcounts => dispatch(success(dashboardcounts)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: adminConstants.GETDASHBOARDALL_REQUEST } }
    function success(admin) { return { type: adminConstants.GETDASHBOARDALL_SUCCESS, admin } }
    function failure(error) { return { type: adminConstants.GETDASHBOARDALL_FAILURE, error } }
}







