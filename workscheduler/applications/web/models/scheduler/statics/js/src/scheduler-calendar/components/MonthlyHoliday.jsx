import React from 'react';

import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

const monthlyHoliday = ({ holidays, onChange }) => {
    return (
        <TextField type="number" onChange={onChange} value={holidays}
            label="holidays" InputProps={{ min:"0" }}
    )
};

export default monthlyHoliday;