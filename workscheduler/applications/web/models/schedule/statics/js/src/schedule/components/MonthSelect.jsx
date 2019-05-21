import React from 'react';

import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';

import DatePicker from 'rc-calendar/lib/Picker';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import 'rc-calendar/assets/index';
import moment from 'moment';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const MonthSelect = ({ scheduleOf, affiliation, onMonthChange }) => {
    const calendar = <MonthCalendar />;
    const date = moment(scheduleOf, 'YYYY-MM')
    return (
        <React.Fragment>
            <Typography variant="h4" css={css`
                    float: right;
                    margin: 0.5rem 1rem;
                `}>{date.format("YYYY-MM")}</Typography>
            <DatePicker animation="slide-up" calendar={calendar} style={{ zIndex: 1500 }}
                value={date} onChange={e => onMonthChange(affiliation, e)}>
                { ({ value }) => {
                    return (
                        <Fab color="primary" css={css`
                                float: right;
                                z-index: 9999;
                            `}>
                            <CalendarTodayRoundedIcon />
                        </Fab>
                    )}}
            </DatePicker>
        </React.Fragment>
    )
}

export default MonthSelect;