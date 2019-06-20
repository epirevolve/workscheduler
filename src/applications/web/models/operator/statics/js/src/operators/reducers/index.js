import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import operatorDialog from './operator-dialog';
import operators from './operators';

const dataset = document.querySelector('script[src*="operators"]').dataset;
export const initValue = ({
    operators: JSON.parse(dataset.operators),
    operatorDialog: {isOpen: false}
});

export default combineWithCommonReducer({operatorDialog, operators});