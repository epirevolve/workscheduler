import React from 'react';
import propTypes from "prop-types";

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TableCell from '@material-ui/core/TableCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const cellCss = css({
    fontWeight: 'initial !important',
    verticalAlign: 'middle',
    textAlign: 'center !important'
});

const dayRequireCell = ({ require, changeRequire }) => {
    const count = [];
    for (let i = 0; i < 21; i ++) {
        count.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
    }
    return (
        <TableCell css={cellCss}>
            <Select value={require} onChange={changeRequire}>
                {count}
            </Select>
        </TableCell>
    );
};

dayRequireCell.propTypes = {
    require: propTypes.number.isRequired,
    changeRequire: propTypes.func.isRequired
};

const areEqual = (prevProps, nextProps) => prevProps["require"] == nextProps["require"];

export default React.memo(dayRequireCell, areEqual);