import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import schedules from '../../common/reducers/schedules';
import ui from '../../common/reducers/ui';

import { initValue as schedulesinitValue } from '../../common/reducers';
export const initValue = ({
    schedules: schedulesinitValue,
    ui: {isLoading: true}
});

export default combineWithCommonReducer({schedules, ui});