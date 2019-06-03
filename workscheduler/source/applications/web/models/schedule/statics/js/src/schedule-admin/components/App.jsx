import React from 'react';

import ChangeSelectMonth from '../containers/ChangeSelectMonth'
import ChangeAffiliation from '../containers/ChangeAffiliation';
import DisplaySchedules from '../containers/DisplaySchedules';
import PublishSchedules from '../containers/PublishSchedules';

const app = () => (
    <>
        <ChangeAffiliation />
        <ChangeSelectMonth />
        <DisplaySchedules />
        <PublishSchedules />
    </>
)

export default app;