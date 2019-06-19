import React from 'react';

import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';

import DatePicker from 'rc-calendar/lib/Picker';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import 'rc-calendar/assets/index';
import moment from 'moment';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const titleCss = css({
    float: 'left',
    margin: '1rem 2rem'
});

const iconCss = css({
    zIndex: 9999,
    margin: '.5rem'
});

const monthSelect = ({ scheduleOf, team, onMonthChange }) => {
    const calendar = <MonthCalendar />;
    const date = moment(scheduleOf, 'YYYY-MM');
    return (
        <>
            <Typography variant="h4" css={titleCss}>{date.format("YYYY-MM")}</Typography>
            <DatePicker animation="slide-up" calendar={calendar} style={{ zIndex: 1500 }}
                value={date} onChange={(e) => onMonthChange(team, e)}>
                {() => (
                    <Fab color="primary" css={iconCss}>
                        <CalendarTodayRoundedIcon />
                    </Fab>
                )}
            </DatePicker>
        </>
    );
};

export default monthSelect;