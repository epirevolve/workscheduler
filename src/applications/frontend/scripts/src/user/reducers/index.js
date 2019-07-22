import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import user from './user';

import { user as myself } from "../embeddedData";

export const initValue = ({
    user: myself
});

export default combineWithCommonReducer({ user });