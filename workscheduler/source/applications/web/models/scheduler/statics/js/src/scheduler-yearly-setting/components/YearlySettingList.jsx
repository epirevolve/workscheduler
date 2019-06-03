import React from 'react';

import List from '@material-ui/core/List';

import YearlySetting from './YearlySetting';

const yearlySettingList = ({ yearlySettings, handleEdit }) => {
    const yearlySettingList = yearlySettings.map(x =>
        <YearlySetting key={x.id} yearlySetting={x} handleEdit={() => handleEdit(x)} />
    );

    return (
        <List>
            {yearlySettingList}
        </List>
    )
};

export default yearlySettingList;