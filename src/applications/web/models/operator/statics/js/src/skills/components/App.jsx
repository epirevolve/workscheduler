import React from 'react';

import Layout from 'Layout';
import OpenDialog from '../containers/OpenDialog';
import DisplaySkills from '../containers/DisplaySkills';

const app = () => (
    <Layout>
        <OpenDialog />
        <DisplaySkills />
    </Layout>
);

export default app;