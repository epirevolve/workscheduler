import React from 'react';

import OpenDialog from "../containers/OpenDialog";
import DisplayAvailableVacations from '../containers/DisplayAvailableVacations';
import WaitLoading from 'WaitLoading';

const app = () => (
    <WaitLoading>
        <OpenDialog />
        <DisplayAvailableVacations />
    </WaitLoading>
);

export default app;