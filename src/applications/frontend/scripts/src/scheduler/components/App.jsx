import React from 'react';

import BasicSetting from './BasicSetting';
import WaitLoading from 'WaitLoading';

const app = () => (
    <WaitLoading>
        <BasicSetting />
    </WaitLoading>
);

export default app;