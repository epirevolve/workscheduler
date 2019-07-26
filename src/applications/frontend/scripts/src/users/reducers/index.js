import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import userDialog from './user-dialog';
import users from './users';
import ui from './ui';

import { users as usersInitValue } from "../embeddedData";

export const initValue = ({
    users: usersInitValue
});

export default combineWithCommonReducer({ userDialog, users, ui });