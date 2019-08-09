import { reducerWrapper } from 'commonReducer';

import operator from './operator';
import { operator as operatorInitValue } from "../embeddedData";

export const initValue = ({
    operator: operatorInitValue
});

export default reducerWrapper({ operator });