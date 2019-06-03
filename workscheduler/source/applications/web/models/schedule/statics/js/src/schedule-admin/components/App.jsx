import React from 'react';

import ChangeSelectMonth from '../containers/ChangeSelectMonth';
import ChangeAffiliation from '../containers/ChangeAffiliation';
import DisplaySchedules from '../containers/DisplaySchedules';
import CommitSchedules from '../containers/CommitSchedules';

const app = () => (
    <>
        <ChangeAffiliation />
        <ChangeSelectMonth />
        <DisplaySchedules />
        <CommitSchedules />
    </>
);

export default app;