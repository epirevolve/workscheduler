import React from 'react';

import MonthlySetting from './MonthlySetting';
import WaitLoading from 'WaitLoading';

import { fetchMonthlySetting } from "../services/api";

import { team } from '../embededData';

const app = () => (
    <WaitLoading>
        <MonthlySetting />
    </WaitLoading>
);

const scheduleOf = new Date().addMonths(1).toYearMonthFormatString();

fetchMonthlySetting({ scheduleOf, team });

export default app;