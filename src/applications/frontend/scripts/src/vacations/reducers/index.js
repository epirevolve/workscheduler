import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import vacations from './vacations';
import vacationDialog from "./vacation-dialog";
import ui from "./ui";

const dataset = document.querySelector('script[src*="vacations"]').dataset;
export const initValue = ({
    vacations: [],
    vacationDialog: {},
    ui: { dialogOpen: false }
});

export default combineWithCommonReducer({ vacations, vacationDialog, ui });