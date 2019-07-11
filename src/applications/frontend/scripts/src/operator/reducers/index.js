import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import operator from './operator';
import { operator as operator_ } from "../embeddedData";

export const initValue = ({
    operator: operator_
});

export default combineWithCommonReducer({ operator });