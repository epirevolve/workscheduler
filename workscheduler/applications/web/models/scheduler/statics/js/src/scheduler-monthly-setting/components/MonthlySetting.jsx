import React from 'react';

import MonthSelect from './MonthSelect';
import DayTableContainer from '../containers/DayTableContainer';
import MonthlyHolidayContainer from '../containers/MonthlyHolidayContainer';
import FixedSchedulesContainer from '../containers/FixedSchedulesContainer';
import MonthlySettingContainer from '../containers/MonthlySettingContainer';

const monthlySetting = () => (
    <>
        <MonthSelect />
        <DayTableContainer />
        <MonthlyHolidayContainer />
        <FixedSchedulesContainer />
        <MonthlySettingContainer />
    </>
)

export default monthlySetting;