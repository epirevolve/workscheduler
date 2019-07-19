import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import requestDialog from './request-dialog';
import calendar from './calendar';
import ui from './ui';

const dataset = document.querySelector('script[src*="request"]').dataset;
export const initValue = ({
    calendar: JSON.parse(dataset.calendar),
    requestDialog: {},
    ui: { dialogOpen: false }
});

export default combineWithCommonReducer({ requestDialog, calendar , ui });