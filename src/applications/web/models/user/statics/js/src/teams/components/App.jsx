import React from 'react';

import DialogContainer from '../containers/DialogContainer';
import TeamsContainer from '../containers/TeamsContainer';
import Layout from 'Layout';

const app = () => (
    <Layout>
        <DialogContainer />
        <TeamsContainer />
    </Layout>
);

export default app;