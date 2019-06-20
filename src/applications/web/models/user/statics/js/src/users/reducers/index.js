import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import userDialog from './user-dialog';
import users from './users';

const dataset = document.querySelector('script[src*="users"]').dataset;
export const initValue = ({
    users: JSON.parse(dataset.users),
    userDialog: {isOpen: false}
});

export default combineWithCommonReducer({userDialog, users});