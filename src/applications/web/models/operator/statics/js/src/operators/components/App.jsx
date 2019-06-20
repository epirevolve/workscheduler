import React from 'react';

import Layout from 'Layout';
import DialogContainer from '../containers/DialogContainer';
import OperatorsContainer from '../containers/OperatorsContainer';

const app = () => (
    <Layout>
        <DialogContainer />
        <OperatorsContainer />
    </Layout>
);

export default app;