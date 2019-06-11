import React from 'react';

import ChangeSelectTeam from '../containers/ChangeSelectTeam';
import LaunchScheduler from '../containers/LaunchScheduler';
import ShowSnackbar from 'ShowSnackbar';

const app = () => (
    <>
        <ChangeSelectTeam />
        <LaunchScheduler />
        <ShowSnackbar />
    </>
);

export default app;