import React from 'react';
import propTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';

import DatePicker from 'rc-calendar/lib/Picker';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import 'rc-calendar/assets/index';
import moment from 'moment';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { m2, mx4, my3 } from 'margin';

const titleCss = css({
    float: 'right',
    color: 'lightslategray'
},mx4,my3);

const iconCss = css({
    float: 'right',
    zIndex: 999
},m2);

const monthSelect = ({ monthYear, changeMonthYear }) => {
    const calendar = <MonthCalendar />;
    const date = moment(monthYear, 'YYYY-MM');
    return (
        <>
            <DatePicker animation="slide-up" calendar={calendar} style={{ zIndex: 1500 }}
                value={date} onChange={changeMonthYear}>
                {() => (
                    <Fab color="primary" css={iconCss}>
                        <CalendarTodayRoundedIcon />
                    </Fab>
                )}
            </DatePicker>
            <Typography variant="h4" css={titleCss}>{date.format("YYYY-MM")}</Typography>
        </>
    );
};

monthSelect.propTypes = {
    monthYear: propTypes.string.isRequired,
    changeMonthYear: propTypes.func.isRequired
};

export default monthSelect;