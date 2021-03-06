import { reducerWrapper } from 'commonReducer';

import operatorDialog from './operator-dialog';
import operators from './operators';
import ui from './ui';

const dataset = document.querySelector('script[src*="operators"]').dataset;
export const initValue = ({
    operators: JSON.parse(dataset.operators),
    operatorDialog: {},
    ui: { dialogOpen: false }
});

export default reducerWrapper({ operatorDialog, operators, ui });