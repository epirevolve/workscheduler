import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { zip } from 'array-util';

const css_ = css({
    minWidth: '6rem',
    maxWidth: '6rem',
    padding: '1rem',
    textAlign: 'center'
});

const selectableCell = ({ categories, val, onCategoryChange }) => {
    const options = categories.map((x, i) =>
        <MenuItem key={i} value={x}>{x}</MenuItem>);

    return (
        <TableCell css={css_}>
            <Select value={val} onChange={onCategoryChange}
                css={css`
                    min-width: 5rem;
                    max-width: 5rem;
            `}>
                {options}
            </Select>
        </TableCell>
    );
};

const areEqual = (prevProps, nextProps) => zip(prevProps["categories"], nextProps["categories"]).some(([x, y]) => x == y)
        && prevProps["val"] == nextProps["val"];

export default React.memo(selectableCell, areEqual);