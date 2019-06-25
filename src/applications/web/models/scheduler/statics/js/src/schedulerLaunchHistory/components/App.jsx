import React from 'react';

import Divider from '@material-ui/core/Divider';

import ManageCurrentRunner from '../containers/ManageCurrentRunner';
import DisplayLaunchHistories from '../containers/DisplayLaunchHistories';
import Layout from 'Layout';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { my3 } from 'margin';

const dividerCss = css({}, my3);

const app = () => (
    <Layout>
        <ManageCurrentRunner />
        <Divider css={dividerCss} />
        <DisplayLaunchHistories />
    </Layout>
);

export default app;