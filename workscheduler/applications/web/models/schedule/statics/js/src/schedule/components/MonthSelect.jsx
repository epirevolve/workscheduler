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

const dataset = document.querySelector('script[id="base-schedule"]').dataset;

class MonthSelect extends React.Component {
    onScheduleChange (date) {
        const url = dataset.url;
        const affiliation = JSON.parse(dataset.affiliation);
        const s = date.toDate().toYearMonthFormatString();
        location.href = url.replace('param_affiliation_id', affiliation.id).replace('param_schedule_of', s);
    }

    render () {
        const scheduleOf = dataset.scheduleOf;
        const calendar = <MonthCalendar />;
        const date = moment(scheduleOf, 'YYYY-MM')
        return (
            <React.Fragment>
                <Typography variant="h4" css={css`
                        float: right;
                        margin: 0.5rem 1rem;
                    `}>{date.format("YYYY-MM")}</Typography>
                <DatePicker animation="slide-up" calendar={calendar} style={{ zIndex: 1500 }}
                    value={date} onChange={this.onScheduleChange}>
                    { ({ value }) => {
                        return (
                            <Fab color="primary" css={css`
                                    float: right;
                                `}>
                                <CalendarTodayRoundedIcon />
                            </Fab>
                        )}}
                </DatePicker>
            </React.Fragment>
        )
    }
}

export default MonthSelect;