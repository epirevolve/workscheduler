import React from 'react';

import Layout from 'Layout';
import DisplayHeader from '../containers/DisplayHeader';
import DisplaySchedules from '../containers/DisplaySchedules';

const app = () => (
    <Layout>
        <DisplayHeader />
        <DisplaySchedules />
    </Layout>
);

export default app;