import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import userDialog from './user-dialog';
import users from './users';
import ui from './ui';

const dataset = document.querySelector('script[src*="users"]').dataset;
export const initValue = ({
    users: JSON.parse(dataset.users)
});

export default combineWithCommonReducer({userDialog, users, ui});