import { reducerWrapper } from 'commonReducer';

import userDialog from './user-dialog';
import users from './users';
import ui from './ui';

import { users as usersInitValue } from "../embeddedData";

export const initValue = ({
    users: usersInitValue
});

export default reducerWrapper({ userDialog, users, ui });