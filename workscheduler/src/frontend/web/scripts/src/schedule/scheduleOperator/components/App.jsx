import React from 'react';

import WaitLoading from 'WaitLoading';
import Header from './Header';
import DisplaySchedules from '../containers/DisplaySchedules';

const app = () => (
    <WaitLoading>
        <Header />
        <DisplaySchedules />
    </WaitLoading>
);

export default app;