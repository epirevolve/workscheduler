import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import schedules, { initValue as schedulesinitValue } from '../../common/reducers/schedules';

export const initValue = ({
    schedules: schedulesinitValue,
    ui: { isLoading: true }
});

export default combineWithCommonReducer({ schedules });