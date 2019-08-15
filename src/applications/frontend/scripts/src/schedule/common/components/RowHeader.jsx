import React from 'react';
import propTypes from "prop-types";

import TableCell from '@material-ui/core/TableCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { p2 } from "padding";

const cellCss = {
    position: 'sticky',
    background: 'white',
    zIndex: 99,
    fontWeight: 'initial'
};

const rowHeader = ({ val, left }) => (
    <TableCell component="th" scope="row" css={css({ ...cellCss,
        left: left ? `${8+4*(left-1)}rem` : '0',
        minWidth: left ? '3rem' : '7rem',
        maxWidth: left ? '3rem' : '7rem',
        textAlign: left ? 'center !important' : 'left !important',
    }, p2)}>
        {val}
    </TableCell>
);

rowHeader.propTypes = {
    val: propTypes.string,
    left: propTypes.bool
};

export default React.memo(rowHeader);