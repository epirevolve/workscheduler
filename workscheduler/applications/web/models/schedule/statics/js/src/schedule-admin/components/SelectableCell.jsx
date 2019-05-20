import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const cell = ({ categories, val, onCategoryChange }) => {
    const options = categories.map(x =>
        <MenuItem value={x}>{x}</MenuItem>);

    return (
        <TableCell css={css`
            min-width: 6rem;
            max-width: 6rem;
            padding: 1rem;
            text-align: center;
        `}>
            <Select value={val} css={css`
                min-width: 5rem;
                max-width: 5rem;
            `}>
                {options}
            </Select>
        </TableCell>
    )
}

export default cell;