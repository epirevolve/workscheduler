import React from 'react';

import { makeStyles } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const dayCell = ({ require, handleChange }) => {
    const count = [];
    for (let i; i ++; i < 21) {
        count.push(<MenuItem value={i}>{i}</MenuItem>)
    }
    return (
        <InputLabel htmlFor="dayCell">require</InputLabel>
        <Select value={require} onChange={handleChange}
            inputProps={{ id: "dayCell" }}>
            {count}
        </Select>
    )
}

export default dayCell;