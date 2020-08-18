import { userConstants } from '../constants';
import objectAssign from 'object-assign';
let initialState={};
export function registration(state = initialState, action) {
  let newState;
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {};

    case userConstants.SUBSCRIBER_REQUEST:
      return { registering: true };
    case userConstants.SUBSCRIBER_SUCCESS:
      return initialState;
    case userConstants.SUBSCRIBER_FAILURE:
      return {};
    default:
      return state
  }
}
