import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

import DatePicker from 'rc-calendar/lib/Picker';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import 'rc-calendar/assets/index';
import moment from 'moment';

const $script = $('script[src*="scheduler-calendar.min.js"]');

const url = $script.data('url');
const paidHolidays = $script.data('paidHolidays');

class Header extends React.Component {
    onScheduleChange (date) {
        const s = date.toDate().toYearMonthFormatString();
        location.href = url.replace('schedule_of', s);
    }

    render () {
        const calendar = <MonthCalendar />;
        return (
            <div class="my-3" style={{ display: 'flex', alignItems: 'center' }}>
                <DatePicker animation="slide-up" calendar={calendar} style={{ zIndex: 1500 }}
                    value={this.props.scheduleOf} onChange={this.props.onScheduleChange} >
                    { ({ value }) => {
                        return (
                            <TextField autoFocus margin="dense" label="date"
                                fullWidth InputProps={{ readOnly: true, tabIndex: "-1" }}
                                value={`${value.format('YYYY-MM')}` || ''} />
                            )}}
                </DatePicker>
                <h2 class="mx-4">of</h2>
                <div>
                    <h1>{ this.props.scheduler.affiliation.name }</h1>
                </div>
            </div>
        )
    }
}