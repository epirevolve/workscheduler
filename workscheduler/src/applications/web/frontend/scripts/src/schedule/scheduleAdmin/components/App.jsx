import React from 'react';

import WaitLoading from 'WaitLoading';
import DisplayHeader from '../containers/DisplayHeader';
import DisplaySchedules from '../containers/DisplaySchedules';

const app = () => (
    <WaitLoading>
        <DisplayHeader />
        <DisplaySchedules />
    </WaitLoading>
);

export default app;