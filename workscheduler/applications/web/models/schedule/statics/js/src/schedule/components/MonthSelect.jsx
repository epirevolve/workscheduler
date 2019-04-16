import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';

import DatePicker from 'rc-calendar/lib/Picker';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import 'rc-calendar/assets/index';
import moment from 'moment';

const dataset = document.querySelector('script[src="schedule"]').dataset;
const url = dataset.url;
const scheduleOf = dataset.scheduleOf;
const affiliation = JSON.parse(dataset.affiliation);

class MonthSelect extends React.Component {
    onScheduleChange (date) {
        const s = date.toDate().toYearMonthFormatString();
        location.href = url.replace('param_affiliation_id', affiliation.id).replace('param_schedule_of', s);
    }

    render () {
        const calendar = <MonthCalendar />;
        return (
            <AppBar position="static" className="mb-4">
                <Toolbar>
                    <Typography variant="h4" color="inherit">
                        {moment(scheduleOf).format("YYYY-MM")}
                        <DatePicker animation="slide-up" calendar={calendar} style={{ zIndex: 1500 }}
                            value={moment(scheduleOf)} onChange={this.onScheduleChange}>
                            { ({ value }) => {
                                return (
                                    <IconButton className="ml-2" color="inherit" aria-label="Calendar">
                                        <CalendarTodayRoundedIcon />
                                    </IconButton>
                                )}}
                        </DatePicker>
                    </Typography>
                    <Typography variant="h4" color="inherit" className="mx-4">
                        of
                    </Typography>
                    <Typography variant="h4" color="inherit">
                        {affiliation.name}
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default MonthSelect;