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

const dataset = document.querySelector('script[src*="schedulerMonthly"]').dataset;
const url = dataset.url;
const scheduleOf = dataset.scheduleOf;
const team = JSON.parse(dataset.team);

class MonthSelect extends React.Component {
    onScheduleChange (date) {
        const s = date.toDate().toYearMonthFormatString();
        location.href = url.replace('param_team_id', team.id).replace('param_calendar', s);
    }

    render () {
        const calendar = <MonthCalendar />;
        const date = moment(scheduleOf, 'YYYY-MM');
        return (
            <>
                <Typography variant="h4" css={css`
                        float: right;
                        margin: 0.5rem 1rem;
                    `}>{date.format("YYYY-MM")}</Typography>
                <DatePicker animation="slide-up" calendar={calendar} style={{ zIndex: 1500 }}
                    value={date} onChange={this.onScheduleChange}>
                    { () => (
                            <Fab color="primary" css={css`
                                    float: right;
                                `}>
                                <CalendarTodayRoundedIcon />
                            </Fab>
                        )}
                </DatePicker>
            </>
        );
    }
}

export default MonthSelect;