//code that includes all the state of our app

import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';

export default combineReducers({
    user: userReducer
});
