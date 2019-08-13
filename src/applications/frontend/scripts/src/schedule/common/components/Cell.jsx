import React from 'react';

import TableCell from '@material-ui/core/TableCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { p2 } from 'padding';

const cellCss = css({
    maxWidth: '5rem',
    minWidth: '5rem',
    textAlign: 'center !important'
}, p2);

const cell = ({ val }) => (
    <TableCell css={cellCss}>
        {val}
    </TableCell>
);

const areEqual = (prevProps, nextProps) => prevProps["val"] == nextProps["val"];

export default React.memo(cell, areEqual);