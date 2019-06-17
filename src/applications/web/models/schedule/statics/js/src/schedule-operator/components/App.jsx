import React from 'react';

import ChangeSelectMonth from '../../schedule/containers/ChangeSelectMonth';
import DisplaySchedules from '../containers/DisplaySchedules';

const app = () => (
    <>
        <ChangeSelectMonth />
        <DisplaySchedules />
    </>
);

export default app;