import React from 'react';

import OpenDialog from "../containers/OpenDialog";
import ChangeSelectMonth from '../containers/ChangeSelectMonth';
import ManageDaySettings from '../containers/ManageDaySettings';
import AdjustMonthlyHolidayCount from '../containers/AdjustMonthlyHolidayCount';
import DisplayFixedSchedules from '../containers/DisplayFixedSchedules';
import CommitMonthlySetting from '../containers/CommitMonthlySetting';

const monthlySetting = () => (
    <>
        <OpenDialog />
        <ChangeSelectMonth />
        <ManageDaySettings />
        <AdjustMonthlyHolidayCount />
        <DisplayFixedSchedules />
        <CommitMonthlySetting />
    </>
);

export default monthlySetting;