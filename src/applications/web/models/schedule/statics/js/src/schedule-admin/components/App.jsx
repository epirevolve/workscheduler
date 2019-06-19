import React from 'react';

import Header from './Header';
import DisplaySchedules from '../containers/DisplaySchedules';
import CommitSchedules from '../containers/CommitSchedules';
import ShowSnackbar from 'ShowSnackbar';

const app = () => (
    <>
        <Header />
        <DisplaySchedules />
        <CommitSchedules />
        <ShowSnackbar />
    </>
);

export default app;