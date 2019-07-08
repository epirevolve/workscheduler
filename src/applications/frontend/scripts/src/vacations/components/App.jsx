import React from 'react';

import OpenDialog from "../containers/OpenDialog";
import DisplayAvailableVacations from '../containers/DisplayAvailableVacations';
import Layout from 'Layout';

const app = () => (
    <Layout>
        <OpenDialog />
        <DisplayAvailableVacations />
    </Layout>
);

export default app;