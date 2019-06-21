import React from 'react';

import Layout from 'Layout';
import Header from './Header';
import DisplaySchedules from '../containers/DisplaySchedules';

const app = () => (
    <Layout>
        <Header />
        <DisplaySchedules />
    </Layout>
);

export default app;