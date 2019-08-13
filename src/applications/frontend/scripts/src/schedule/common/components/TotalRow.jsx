import React from 'react';
import propTypes from "prop-types";

import TableRow from '@material-ui/core/TableRow';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import RowHeader from './RowHeader';
import TotalCell from './TotalCell';

import { zip } from 'arrayUtil';

const rowCss = {
    position: 'sticky',
    background: 'white',
    zIndex: 99,
    minHeight: '3rem',
    maxHeight: '3rem'
};

const totalRow = ({ headers, cells, bottom }) => (
    <TableRow css={css({ ...rowCss,
        bottom: `${3.41*bottom}rem`
    })}>
        {headers.map((x, i) => <RowHeader key={i} val={x} left={i} />)}
        {cells.map((x, i) => <TotalCell key={i} {...x} />)}
    </TableRow>
);

totalRow.propTypes = {
    headers: propTypes.array,
    cells: propTypes.array,
    bottom: propTypes.number
};

const areEqual = (prevProps, nextProps) => zip(prevProps["cells"], nextProps["cells"]).some(([ x, y ]) => x == y)
        && zip(prevProps["headers"], nextProps["headers"]).some(([ x, y ]) => x == y);

export default React.memo(totalRow, areEqual);