import React from 'react';

import WaitLoading from 'WaitLoading';
import OpenDialog from "../containers/OpenDialog";
import ChangeSelectMonth from '../containers/ChangeSelectMonth';
import ManageDaySettings from '../containers/ManageDaySettings';
import AdjustMonthlyHolidayCount from '../containers/AdjustMonthlyHolidayCount';
import DisplayFixedSchedules from '../containers/DisplayFixedSchedules';
import CommitMonthlySetting from '../containers/CommitMonthlySetting';

const app = () => (
    <WaitLoading>
        <OpenDialog />
        <ChangeSelectMonth />
        <ManageDaySettings />
        <AdjustMonthlyHolidayCount />
        <DisplayFixedSchedules />
        <CommitMonthlySetting />
    </WaitLoading>
);

export default app;