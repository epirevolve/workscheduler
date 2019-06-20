import React from 'react';

import DialogContainer from '../containers/DialogContainer';
import UsersContainer from '../containers/UsersContainer';
import Layout from 'Layout';

const app = () => (
    <Layout>
        <DialogContainer />
        <UsersContainer />
    </Layout>
);

export default app;