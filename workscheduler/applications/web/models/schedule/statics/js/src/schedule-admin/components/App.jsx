import React from 'react';

import Affiliations from './Affiliations';
import Schedules from './Schedules';
import PublishState from './PublishState';

const app = () => (
    <React.Fragment>
        <Affiliations />
        <Schedules />
        <PublishState />
    </React.Fragment>
)

export default app;