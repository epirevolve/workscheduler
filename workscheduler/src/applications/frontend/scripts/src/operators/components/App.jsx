import React from 'react';

import Layout from 'Layout';
import OpenDialog from '../containers/OpenDialog';
import DisplayOperators from '../containers/DisplayOperators';

const app = () => (
    <Layout>
        <OpenDialog />
        <DisplayOperators />
    </Layout>
);

export default app;