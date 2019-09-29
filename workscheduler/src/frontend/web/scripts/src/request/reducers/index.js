import { reducerWrapper } from 'commonReducer';

import requestDialog from './request-dialog';
import monthlySetting from './monthly-setting';
import vacations from "./vacations";
import ui from './ui';

export const initValue = ({
    monthlySetting: {},
    vacations: [],
    requestDialog: {},
    ui: { dialogOpen: false, isLoading: true, }
});

export default reducerWrapper({ requestDialog, monthlySetting, vacations, ui });