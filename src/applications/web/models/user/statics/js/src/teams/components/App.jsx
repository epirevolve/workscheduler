import React from 'react';

import DialogContainer from '../containers/DialogContainer';
import DisplayTeams from '../containers/DisplayTeams';
import Layout from 'Layout';

const app = () => (
    <Layout>
        <DialogContainer />
        <DisplayTeams />
    </Layout>
);

export default app;