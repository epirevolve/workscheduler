import { reducerWrapper } from 'commonReducer';

import scheduler from './scheduler';
import ui from "./ui";

export const initValue = ({
    scheduler: {},
    ui: {}
});

export default reducerWrapper({ scheduler, ui });