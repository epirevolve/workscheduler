import React from 'react';

import ChangeSelectTeam from '../containers/ChangeSelectTeam';
import LaunchScheduler from '../containers/LaunchScheduler';
import Layout from 'Layout';

const app = () => (
    <Layout>
        <ChangeSelectTeam />
        <LaunchScheduler />
    </Layout>
);

export default app;