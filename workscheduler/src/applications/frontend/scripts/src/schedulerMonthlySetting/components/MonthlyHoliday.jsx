import React from 'react';
import propTypes from "prop-types";

import TextField from '@material-ui/core/TextField';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { mt3, mb2 } from "margin";

const monthlyHoliday = ({ holidays, changeHolidayCount }) => (
    <TextField type="number" onChange={changeHolidayCount} value={holidays}
        label="holidays" InputProps={{ min:"0" }} css={css(mt3, mb2)} />
);

monthlyHoliday.propTypes = {
    holidays: propTypes.number,
    changeHolidayCount: propTypes.func.isRequired
};

export default monthlyHoliday;