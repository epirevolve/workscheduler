import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import user from './user';

const dataset = document.querySelector('script[src*="user"]').dataset;
export const initValue = ({
    user: JSON.parse(dataset.user)
});

export default combineWithCommonReducer({ user });