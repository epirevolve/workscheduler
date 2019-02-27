import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import DatePicker from 'rc-calendar/lib/Picker';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import 'rc-calendar/assets/index';
import moment from 'moment';

const $script = $('script[src*="scheduler-month-year-setting"]');

const url = $script.data('url');
const scheduleOf = $script.data('scheduleOf');
const affiliationName = $script.data('affiliationName');

class Title extends React.Component {
    onScheduleChange (date) {
        const s = date.toDate().toYearMonthFormatString();
        location.href = url.replace('schedule_of', s);
    }

    render () {
        const calendar = <MonthCalendar />;
        return (
            <div className="mt-2 mb-4" style={{ display: 'flex', alignItems: 'center' }}>
                <DatePicker animation="slide-up" calendar={calendar} style={{ zIndex: 1500 }}
                    value={moment(scheduleOf)} onChange={this.onScheduleChange}>
                    { ({ value }) => {
                        return (
                            <TextField inputProps={{ readOnly: true, tabIndex: "-1" }} className="title"
                                value={`${value.format('YYYY-MM')}` || ''} />
                        )}}
                </DatePicker>
                <h2 className="mx-4">of</h2>
                <div>
                    <h1>{affiliationName}</h1>
                </div>
            </div>
        )
    }
}

export default Title;