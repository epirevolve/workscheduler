import React from 'react';

import Title from './Title';
import DayRequireContainer from '../containers/DayRequireContainer';
import MonthlyHolidayContainer from '../containers/MonthlyHolidayContainer';
import FixedScheduleListContainer from '../containers/FixedScheduleListContainer';
import ActionContainer from '../containers/ActionContainer';

const app = () => (
    <React.Fragment>
        <Title />
        <DayRequireContainer />
        <MonthlyHolidayContainer />
        <FixedScheduleListContainer />
        <ActionContainer />
    </React.Fragment>
)

export default app;