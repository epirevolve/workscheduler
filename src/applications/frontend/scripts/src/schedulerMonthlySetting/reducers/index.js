import { reducerWrapper } from 'commonReducer';

import monthlySetting from './monthly-setting';
import fixedScheduleDialog from "./fixed-schedule-dialog";
import ui from './ui';

export const initValue = ({
    monthlySetting: {},
    fixedScheduleDialog: {},
    ui: { isLoading: true, dialogOpen: false, isProgressing: false }
});

export default reducerWrapper({ monthlySetting, fixedScheduleDialog, ui });