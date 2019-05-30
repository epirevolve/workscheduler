import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import YearlySettingList from './YearlySettingList';

const yearlySettings = ({ handleAppend, ...other }) => {
    return (
        <>
            <YearlySettingList {...other} />
            <div>
                <IconButton onClick={(e) => { handleAppend(); e.stopPropagation(); }}>
                    <AddIcon />
                </IconButton>
            </div>
        </>
    )
}