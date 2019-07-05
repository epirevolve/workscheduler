import React from 'react';

import InputUser from '../containers/InputUser';
import CommitUser from "../containers/CommitUser";
import Layout from 'Layout';

const app = () => (
    <Layout>
        <InputUser />
        <CommitUser />
    </Layout>
);

export default app;