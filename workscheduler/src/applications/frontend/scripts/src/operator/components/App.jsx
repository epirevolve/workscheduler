import React from 'react';

import Layout from 'Layout';
import EditOperator from '../containers/EditOperator';
import CommitOperator from '../containers/CommitOperator';

const app = () => (
    <Layout>
        <EditOperator />
        <CommitOperator />
    </Layout>
);

export default app;