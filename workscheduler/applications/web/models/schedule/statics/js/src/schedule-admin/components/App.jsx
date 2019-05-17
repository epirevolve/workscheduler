import React from 'react';

import ChangeAffiliation from '../containers/ChangeAffiliation';
import DisplaySchedules from '../containers/DisplaySchedules';
import PublishState from './PublishState';

const app = () => (
    <React.Fragment>
        <ChangeAffiliation />
        <DisplaySchedules />
        <PublishState />
    </React.Fragment>
)

export default app;