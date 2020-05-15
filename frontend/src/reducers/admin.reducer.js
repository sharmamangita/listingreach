import { adminConstants } from '../constants';
import objectAssign from 'object-assign';

export function admins(state = {}, action) {
  let newState;
  console.log('Reducer admins111=====:', action);
  switch (action.type) {
    case adminConstants.GETALL_REQUEST:
      newState = objectAssign({}, state, {
        loading: true
      });
      return newState;
    case adminConstants.GETALL_SUCCESS:
      newState = objectAssign({}, state, {
        loading: true,
        candidateData: action.admin.data.userData,
        downloadData: action.admin.data.downloadData
      });
      return newState;
    case adminConstants.GETALL_FAILURE:
      return {
        error: action.error
      };

    case adminConstants.GETDASHBOARDALL_REQUEST:
      newState = objectAssign({}, state, {
        loading: true
      });
      return newState;
    case adminConstants.GETDASHBOARDALL_SUCCESS:
      newState = objectAssign({}, state, {
        loading: true,
        dashboard: action.admin
      });
      return newState;
    case adminConstants.GETDASHBOARDALL_FAILURE:
      return {
        error: action.error
      };

      case adminConstants.BLAST_SETTINGS_REQUEST:
        newState = objectAssign({}, state, {
          loading: true
        });
        return newState;
      case adminConstants.BLAST_SETTINGS_SUCCESS:
        newState = objectAssign({}, state, {
          loading: true,
          blastsettings: action.blastsettings[0]
        });
        return newState;
      case adminConstants.BLAST_SETTINGS_FAILURE:
        return { 
          error: action.error
        };

        case adminConstants.AGENTS_REQUEST:
          newState = objectAssign({}, state, {
            loading: true
          });
          return newState;
        case adminConstants.AGENTS_SUCCESS:
          newState = objectAssign({}, state, {
            loading: true,
            agents: action.agents
          });
          return newState;
        case adminConstants.AGENTS_FAILURE:
          return { 
            error: action.error
          };


    case adminConstants.GETALLHR_REQUEST:
      newState = objectAssign({}, state, {
        loading: true
      });
      return newState;
    case adminConstants.GETALLHR_SUCCESS:
      newState = objectAssign({}, state, {
        loading: true,
        hrData: action.admin.data.userData,
        downloadData: action.admin.data.downloadData
      });
      return newState;
    case adminConstants.GETALLHR_FAILURE:
      return {
        error: action.error
      };
    case adminConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      newState = objectAssign({}, state, {
        loading: true
      });
      return newState;
    case adminConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };

    case adminConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };

    case adminConstants.GETBYID_REQUEST:
      newState = objectAssign({}, state, {
        loading: true
      });
      return newState;
    case adminConstants.GETBYID_SUCCESS:
      newState = objectAssign({}, state, {
        loading: true,
        candidates: action.user[0]
      });
      return newState;
    case adminConstants.GETBYID_FAILURE:
      return {
        error: action.error
      };

    default:
      return state
    case adminConstants.PLAN_REQUEST:
      newState = objectAssign({}, state, {
        loading: true
      });
      return newState;
    case adminConstants.PLAN_SUCCESS:
      console.log("action.admin===", action);
      if (action.admin && action.admin.length > 0) {
        var variable = action.admin[0];
        newState = objectAssign({}, state, {
          loading: true,
          plan: {
            plan: variable.plan,
            experience_one: variable.experience_one,
            experience_two: variable.experience_two,
            experience_three: variable.experience_three
          },
          plandata: action.admin,
          submitted: false
        });
      } else {
        newState = objectAssign({}, state, {
          loading: true,
          plan: action.admin
        });
      }
      return newState;
    case adminConstants.PLAN_FAILURE:
      return {
        error: action.error
      };

    case adminConstants.GETCONTENT_REQUEST:
      newState = objectAssign({}, state, {
        loading: true
      });
      return newState;
    case adminConstants.GETCONTENT_SUCCESS:
      newState = objectAssign({}, state, {
        loading: true,
        pageData: action.admins
      });
      return newState;
    case adminConstants.GETCONTENT_FAILURE:
      return {
        error: action.error
      };
    case adminConstants.UPDATE_SUCCESS:
      newState = objectAssign({}, state, {
        loading: true,
        profile: action.admins
      });
      return newState;
  }
}
