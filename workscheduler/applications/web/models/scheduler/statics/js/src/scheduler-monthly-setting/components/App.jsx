import React from 'react';

import Title from './Title';
import DayRequireContainer from '../containers/DayRequireContainer';
import MonthlyHolidayContainer from '../containers/MonthlyHolidayContainer';
import FixedScheduleListContainer from '../containers/FixedScheduleListContainer';
import MonthlySettingContainer from '../containers/MonthlySettingContainer';

const app = () => (
    <React.Fragment>
        <Title />
        <DayRequireContainer />
        <MonthlyHolidayContainer />
        <FixedScheduleListContainer />
        <MonthlySettingContainer />
    </React.Fragment>
)

export default app;