import { combineReducers } from 'redux';

import schedules from '../../schedule/reducers/schedules';
import ui from '../../schedule/reducers/ui';

export default combineReducers({
    schedules, ui
})