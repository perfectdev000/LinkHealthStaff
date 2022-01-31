import auth from './reducers/auth_reducer';
import staffSignUp from './reducers/staffSignUp_reducer';
import hospSignUp from './reducers/hospSignUp_reducer';
import logIn from './reducers/logIn_reducer';
import staffProfile from './reducers/staffProfile_reducer';
import hospitalProfile from './reducers/hospitalProfile_reducer';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  auth: auth,
  staffSignUp: staffSignUp,
  hospSignUp: hospSignUp,
  logIn: logIn,
  staffProfile: staffProfile,
  hospitalProfile: hospitalProfile,
  router: routerReducer
});
