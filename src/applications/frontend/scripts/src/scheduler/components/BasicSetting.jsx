import React from 'react';

import SelectTrivialOptions from '../containers/SelectTrivialOptions';
import DisplayWorkCategories from '../containers/DisplayWorkCategories';
import CommitScheduler from '../containers/CommitScheduler';

const basicSetting = () => (
    <>
        <SelectTrivialOptions />
        <DisplayWorkCategories />
        <CommitScheduler />
    </>
);

export default basicSetting;