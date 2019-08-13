import React from 'react';
import propTypes from "prop-types";

import TableCell from '@material-ui/core/TableCell';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Box from "@material-ui/core/Box";

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { zip } from 'arrayUtil';

const cellCss = css({
    textAlign: 'center !important',
    padding: '0.5rem !important'
});

const selectCss = css({
    maxWidth: '5rem',
    minWidth: '5rem',
});

const selectableCell = ({ categories, val, changeCategory }) => {
    const options = categories.map((x, i) => <MenuItem key={i} value={x}>{x}</MenuItem>);
    return (
        <TableCell css={cellCss}>
            <Box css={selectCss}>
                <Select value={val} onChange={changeCategory}>
                    {options}
                </Select>
            </Box>
        </TableCell>
    );
};

selectableCell.propTypes = {
    categories: propTypes.array,
    val: propTypes.any,
    changeCategory: propTypes.func.isRequired
};

const areEqual = (prevProps, nextProps) => zip(prevProps["categories"], nextProps["categories"]).some(([ x, y ]) => x == y)
        && prevProps["val"] == nextProps["val"];

export default React.memo(selectableCell, areEqual);