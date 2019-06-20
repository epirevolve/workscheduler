import React from 'react';

import Layout from 'Layout';
import Header from './Header';
import DisplaySchedules from '../containers/DisplaySchedules';
import CommitSchedules from '../containers/CommitSchedules';

const app = () => (
    <Layout>
        <Header />
        <DisplaySchedules />
        <CommitSchedules />
    </Layout>
);

export default app;