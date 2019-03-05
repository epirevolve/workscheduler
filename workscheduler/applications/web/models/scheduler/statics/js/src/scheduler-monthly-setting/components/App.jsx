import React from 'react';

import Title from './Title';
import DayRequireContainer from '../containers/DayRequireContainer';
import MonthlyHolidayContainer from '../containers/MonthlyHolidayContainer';
import FixedSchedulesContainer from '../containers/FixedSchedulesContainer';
import MonthlySettingContainer from '../containers/MonthlySettingContainer';

const app = () => (
    <React.Fragment>
        <Title />
        <DayRequireContainer />
        <MonthlyHolidayContainer />
        <FixedSchedulesContainer />
        <MonthlySettingContainer />
    </React.Fragment>
)

export default app;