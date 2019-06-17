import React from 'react';

import ChangeSelectMonth from '../containers/ChangeSelectMonth';
import ChangeTeam from '../containers/ChangeTeam';
import DisplaySchedules from '../containers/DisplaySchedules';
import CommitSchedules from '../containers/CommitSchedules';
import ShowSnackbar from 'ShowSnackbar';

const app = () => (
    <>
        <ChangeTeam />
        <ChangeSelectMonth />
        <DisplaySchedules />
        <CommitSchedules />
        <ShowSnackbar />
    </>
);

export default app;