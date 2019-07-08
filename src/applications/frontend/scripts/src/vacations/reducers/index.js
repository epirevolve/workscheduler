import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import vacations from './vacations';

export const initValue = ({
    vacations: []
});

export default combineWithCommonReducer({ vacations });