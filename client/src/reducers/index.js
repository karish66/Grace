import { combineReducers } from 'redux';
import acceptReducer from './acceptReducer';
import authReducer from './authReducer'
import signupReducer from './signupReducer'
import UserReducer from './UserReducer'
import donateReducer from './donateReducer';
export default combineReducers({
    auth : authReducer,
    signup : signupReducer,
    dashboard : UserReducer,
    request: donateReducer,
    accept:acceptReducer
});