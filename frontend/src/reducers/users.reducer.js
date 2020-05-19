import { userConstants } from '../constants';
import objectAssign from 'object-assign';

export function users(state = {}, action) {
  let newState;
  
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      newState = objectAssign({}, state, {
        loading: true
      });
      return newState;
    case userConstants.GETALL_SUCCESS:
      newState = objectAssign({}, state, {
        items: action.users
      });
      return newState;
    case userConstants.GETSAVEDALL_SUCCESS:
      newState = objectAssign({}, state, {
        saveditems: action.users
      });
      return newState;
    case userConstants.UPDATE_SUCCESS:
      newState = objectAssign({}, state, {
        loading: true,
        profile: action.users.user
      });
      return newState;

    case userConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case userConstants.GETBYID_REQUEST:
      newState = objectAssign({}, state, {
        loading: true
      });
      return newState;
    case userConstants.GETBYID_SUCCESS:
     
      newState = objectAssign({}, state, {
        loading: true,
        profile: action.user.data.userData[0],
        agentData: action.user.data.agentData[0],
        imageData: action.user.data.imageData
      });
      return newState ;     
     
    case userConstants.GETBYID_FAILURE:
      return { 
        error: action.error
      };
     case userConstants.UPDATESAVED_SUCCESS:
     
      newState = objectAssign({}, state);
      return newState;

      case userConstants.GETREVIEW_REQUEST:
        newState = objectAssign({}, state, {
        loading: true
      });
      return newState;
     case userConstants.REVIEWUPDATE_SUCCESS:
      newState = objectAssign({}, state);
      return newState;

      case userConstants.REVIEW_FAILURE:
      return { 
        error: action.error
      };
      


    case userConstants.GETDOWNLOADEDALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETDOWNLOADEDALL_SUCCESS:
      newState = objectAssign({}, state, {
        loading: true,
        downloaded: action.downloaded
      });
      return newState;
    case userConstants.GETDOWNLOADEDALL_FAILURE:
      return { 
        error: action.error
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        loading: true
        
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
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
      
    default:
      return state
  }
}
