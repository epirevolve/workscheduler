import { reducerWrapper } from 'commonReducer';

import auth from "./auth";

export const initValue = ({
    auth: {}
});

export default reducerWrapper({ auth });