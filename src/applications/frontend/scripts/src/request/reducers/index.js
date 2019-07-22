import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import requestDialog from './request-dialog';
import monthlySetting from './monthly-setting';
import ui from './ui';

export const initValue = ({
    monthlySetting: {},
    requestDialog: {},
    ui: { dialogOpen: false }
});

export default combineWithCommonReducer({ requestDialog, monthlySetting , ui });