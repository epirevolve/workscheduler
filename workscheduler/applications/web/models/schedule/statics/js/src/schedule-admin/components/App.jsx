import React from 'react';

import ChangeSelectMonth from '../../schedule/containers/ChangeSelectMonth'
import ChangeAffiliation from '../containers/ChangeAffiliation';
import DisplaySchedules from '../containers/DisplaySchedules';
import PublishState from './PublishState';

const app = () => (
    <>
        <ChangeAffiliation />
        <ChangeSelectMonth />
        <DisplaySchedules />
        <PublishState />
    </>
)

export default app;