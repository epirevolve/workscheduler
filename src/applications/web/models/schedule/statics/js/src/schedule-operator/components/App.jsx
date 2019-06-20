import React from 'react';

import Layout from 'Layout';
import ChangeSelectMonth from '../../schedule/containers/ChangeSelectMonth';
import DisplaySchedules from '../containers/DisplaySchedules';

const app = () => (
    <Layout>
        <ChangeSelectMonth />
        <DisplaySchedules />
    </Layout>
);

export default app;