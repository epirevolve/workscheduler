import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import schedules, { initValue as schedulesinitValue } from 'schedules';
import ui from 'uiReducer';

export const initValue = ({
    schedules: schedulesinitValue,
    ui: { isLoading: true }
});

export default combineWithCommonReducer({ schedules, ui });