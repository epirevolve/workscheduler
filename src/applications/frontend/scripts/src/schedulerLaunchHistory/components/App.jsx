import React from 'react';

import Divider from '@material-ui/core/Divider';

import ManageCurrentRunner from '../containers/ManageCurrentRunner';
import DisplayLaunchHistories from '../containers/DisplayLaunchHistories';
import Layout from 'Layout';

/** @jsx jsx */
import { jsx } from '@emotion/core';

import { my4 } from 'margin';

const app = () => (
    <Layout>
        <ManageCurrentRunner />
        <Divider css={my4} />
        <DisplayLaunchHistories />
    </Layout>
);

export default app;