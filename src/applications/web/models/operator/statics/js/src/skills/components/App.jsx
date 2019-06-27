import React from 'react';

import Layout from 'Layout';
import DialogContainer from '../containers/DialogContainer';
import DisplaySkills from '../containers/DisplaySkills';

const app = () => (
    <Layout>
        <DialogContainer />
        <DisplaySkills />
    </Layout>
);

export default app;