import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const dayRequireCell = ({ require, onRequireChange }) => {
    const count = [];
    for (let i = 0; i < 21; i ++) {
        count.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
    }
    return (
        <td>
            <Select value={require} onChange={onRequireChange}>
                {count}
            </Select>
        </td>
    )
}

export default dayRequireCell;