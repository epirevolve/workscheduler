import React from 'react';
import propTypes from "prop-types";

import TableCell from '@material-ui/core/TableCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const cellCss = {
    padding: '0.5rem !important',
    position: 'sticky',
    background: 'white',
    zIndex: 99,
    fontWeight: 'initial'
};

const rowHeader = ({ val, left }) => (
    <TableCell component="th" scope="row" css={css({ ...cellCss,
        left: left ? `${7+3*(left-1)}rem` : '0',
        minWidth: left ? '3rem' : '7rem',
        maxWidth: left ? '3rem' : '7rem',
        textAlign: left ? 'center !important' : 'left !important',
    })}>
        {val}
    </TableCell>
);

rowHeader.propTypes = {
    val: propTypes.string,
    left: propTypes.bool
};

export default React.memo(rowHeader);