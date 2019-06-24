import React from 'react';

import Divider from '@material-ui/core/Divider';

import ManageCurrentRunner from '../containers/ManageCurrentRunner';
import DisplayLaunchHistories from '../containers/DisplayLaunchHistory';
import Layout from 'Layout';

const app = () => (
    <Layout>
        <ManageCurrentRunner />
        <Divider />
        <DisplayLaunchHistories />
    </Layout>
);

export default app;