import { combineReducers } from 'redux';

import schedules from '../../schedule/reducers/schedules';
import ui from '../../schedule/reducers/ui';
import snackbar from 'snackbarReducers';

export default combineReducers({
    schedules, ui, snackbar
});