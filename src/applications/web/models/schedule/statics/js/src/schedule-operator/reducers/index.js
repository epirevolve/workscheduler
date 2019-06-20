import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import schedules from '../../schedule/reducers/schedules';
import ui from '../../schedule/reducers/ui';

import { initValue as schedulesinitValue } from '../../schedule/reducers';
export const initValue = ({
    schedules: schedulesinitValue,
    ui: {isLoading: true}
});

export default combineWithCommonReducer({schedules, ui});