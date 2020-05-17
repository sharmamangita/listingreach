import { userConstants } from '../constants';

export function registration(state = {}, action) {
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
      newState = objectAssign({}, state, {
        subscriber: action.subscriber
      });
      return newState;
    case userConstants.SUBSCRIBER_FAILURE:
      return {};
    default:
      return state
  }
}
