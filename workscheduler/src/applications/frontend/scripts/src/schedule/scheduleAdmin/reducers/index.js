import { reducerWrapper } from 'commonReducer';

import schedules from './schedules';
import teams from './teams';
import ui from './ui';

import { team } from "../../common/embeddedData";
import { initValue as schedulesInitValue } from '../../common/reducers/schedules';
export const initValue = {
    schedules: schedulesInitValue,
    teams: { team },
    ui: { isLoading: true, isProgressing: false }
};

export default reducerWrapper({ schedules, teams, ui });