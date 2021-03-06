import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';

import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { admins } from './admin.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  admins,
  alert
});

export default rootReducer;