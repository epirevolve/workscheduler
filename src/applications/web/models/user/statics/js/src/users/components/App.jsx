import React from 'react';

import OpenDialog from '../containers/OpenDialog';
import DisplayUsers from '../containers/DisplayUsers';
import Layout from 'Layout';

const app = () => (
    <Layout>
        <OpenDialog />
        <DisplayUsers />
    </Layout>
);

export default app;