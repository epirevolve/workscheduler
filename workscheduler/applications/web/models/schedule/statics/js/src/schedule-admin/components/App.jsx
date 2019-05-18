import React from 'react';

import ChangeSelectMonth from '../../schedule/containers/ChangeSelectMonth'
import ChangeAffiliation from '../containers/ChangeAffiliation';
import DisplaySchedules from '../containers/DisplaySchedules';
import PublishState from './PublishState';

const app = () => (
    <React.Fragment>
        <ChangeAffiliation />
        <ChangeSelectMonth />
        <DisplaySchedules />
        <PublishState />
    </React.Fragment>
)

export default app;