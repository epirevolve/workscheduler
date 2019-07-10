import React from 'react';

import MonthlySetting from './MonthlySetting';
import WaitLoading from 'WaitLoading';

const app = () => (
    <WaitLoading>
        <MonthlySetting />
    </WaitLoading>
);

export default app;