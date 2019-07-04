import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import requestDialog from './request-dialog';
import calendar from './calendar';

const dataset = document.querySelector('script[src*="request"]').dataset;
export const initValue = ({
    calendar: JSON.parse(dataset.calendar),
    requestDialog: {isOpen: false}
});

export default combineWithCommonReducer({requestDialog, calendar});