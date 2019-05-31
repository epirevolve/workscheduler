import { combineReducers } from 'redux';

import monthlySetting from './monthly-setting';
import ui from './ui';
import snackbar from 'snackbarReducers';

export default combineReducers({
    monthlySetting,
    ui,
    snackbar
})