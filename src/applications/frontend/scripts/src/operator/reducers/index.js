import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import operator from './operator';
import { operator as operatorInitValue } from "../embeddedData";

export const initValue = ({
    operator: operatorInitValue
});

export default combineWithCommonReducer({ operator });