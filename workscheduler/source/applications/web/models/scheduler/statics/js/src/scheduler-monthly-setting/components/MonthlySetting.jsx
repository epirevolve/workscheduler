import React from 'react';

import MonthSelect from './MonthSelect';
import DisplayDaySettings from '../containers/DisplayDaySettings';
import AdjustMonthlyHolidayCount from '../containers/AdjustMonthlyHolidayCount';
import SetFixedSchedules from '../containers/SetFixedSchedules';
import CommitMonthlySetting from '../containers/CommitMonthlySetting';

const monthlySetting = () => (
    <>
        <MonthSelect />
        <DisplayDaySettings />
        <AdjustMonthlyHolidayCount />
        <SetFixedSchedules />
        <CommitMonthlySetting />
    </>
);

export default monthlySetting;