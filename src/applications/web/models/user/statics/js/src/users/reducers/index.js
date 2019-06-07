import { combineReducers } from 'redux';

import userDialog from './user-dialog';
import users from './users';

export default combineReducers({
    userDialog,
    users
});