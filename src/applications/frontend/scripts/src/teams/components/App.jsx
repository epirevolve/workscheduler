import React from 'react';

import OpenDialog from '../containers/OpenDialog';
import DisplayTeams from '../containers/DisplayTeams';
import Layout from 'Layout';

const app = () => (
    <Layout>
        <OpenDialog />
        <DisplayTeams />
    </Layout>
);

export default app;