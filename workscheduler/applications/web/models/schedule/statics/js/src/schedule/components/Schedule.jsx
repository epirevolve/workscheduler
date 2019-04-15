import React from 'react';

import Divider from '@material-ui/core/Divider';

import DayRow from '../components/DayRow';
import Schedule from '../components/Schedule';
import ChangeRequestContainer from '../containers/ChangeRequestContainer';

const schedule = () => (
    <React.Fragment>
        <DayRow />
        <Divider />
        <ChangeRequestContainer />
        <Divider />
        <Schedule />
    </React.Fragment>
)

export default schedule;