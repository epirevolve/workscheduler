import React from 'react';

import SelectTrivialOptions from '../containers/SelectTrivialOptions';
import DisplayWorkCategories from '../containers/DisplayWorkCategories';
import SaveBaseSetting from '../containers/SaveBaseSetting';

const basicSetting = () => (
    <>
        <SelectTrivialOptions />
        <DisplayWorkCategories />
        <SaveBaseSetting />
    </>
);

export default basicSetting;