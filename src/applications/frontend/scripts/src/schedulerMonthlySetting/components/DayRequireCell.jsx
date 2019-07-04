import React from 'react';

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

const dayRequireCell = ({ require, onRequireChange }) => {
    const count = [];
    for (let i = 0; i < 21; i ++) {
        count.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
    }
    return (
        <TableCell css={cellCss}>
            <Select value={require} onChange={onRequireChange}>
                {count}
            </Select>
        </TableCell>
    );
};

const areEqual = (prevProps, nextProps) => prevProps["require"] == nextProps["require"];

export default React.memo(dayRequireCell, areEqual);