import { reducerWrapper } from 'commonReducer';

import user from './user';

import { user as myself } from "../embeddedData";

export const initValue = ({
    user: myself
});

export default reducerWrapper({ user });