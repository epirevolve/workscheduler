import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import scheduler from './scheduler';
import vacationDialog from "./vacation-dialog";
import ui from "./ui";

export const initValue = ({
    scheduler: [],
    vacationDialog: {},
    ui: { dialogOpen: false }
});

export default combineWithCommonReducer({ scheduler, vacationDialog, ui });