import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { zip } from 'arrayUtil';
import { p2 } from 'padding';

const cellCss = css({
    textAlign: 'center'
},p2);

const selectCss = css({
    maxWidth: '5rem',
    minWidth: '5rem'
});

const selectableCell = ({ categories, val, onCategoryChange }) => {
    const options = categories.map((x, i) => <MenuItem key={i} value={x}>{x}</MenuItem>);

    return (
        <TableCell css={cellCss}>
            <Select value={val} onChange={onCategoryChange}
                css={selectCss}>
                {options}
            </Select>
        </TableCell>
    );
};

const areEqual = (prevProps, nextProps) => zip(prevProps["categories"], nextProps["categories"]).some(([x, y]) => x == y)
        && prevProps["val"] == nextProps["val"];

export default React.memo(selectableCell, areEqual);