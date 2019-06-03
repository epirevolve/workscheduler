import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import FormControlLabel from '@material-ui/core/FormControlLabel';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const cellCss = css({
	fontWeight: 'initial !important',
    verticalAlign: 'middle',
    textAlign: 'center !important'
});

const dayIsHolidayCell = ({ isHoliday, onIsHolidayChange }) => (
    <TableCell css={cellCss}>
        <FormControlLabel className="m-0"
            control={<Checkbox checked={isHoliday} onChange={onIsHolidayChange} />} />
    </TableCell>
);

const areEqual = (prevProps, nextProps) => prevProps["isHoliday"] == nextProps["isHoliday"];

export default React.memo(dayIsHolidayCell, areEqual);