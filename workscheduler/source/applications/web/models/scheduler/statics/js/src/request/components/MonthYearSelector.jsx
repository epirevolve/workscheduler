import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import Grid from '@material-ui/core/Grid';

import { AlertManager } from 'alert-helper.js';

const dataset = document.querySelector('script[src*="request"]').dataset;
const url = dataset.url;
const scheduleOf = new Date(dataset.scheduleOf);
const scheduleOfName = dataset.scheduleOfName;

class MonthYearSetting extends React.Component {
    requestOfOtherMonthYear (addMonth) {
        const stamp = Date.parse(scheduleOf);

        if (isNaN(stamp) == true) {
            const alertManager = new AlertManager('#alertContainer');
            alertManager.append('Sorry, we cant do more process due to invalid date.');
            return false;
        }

        const date = new Date(stamp);
        date.setMonth(date.getMonth() + addMonth);
        const date_str = date.toYearMonthFormatString();

        location.href = `${url}?schedule_of=${date_str}`;
    }

    render () {
        const [prev, next] = this.setMonthChangeButtonAvailability();
        return (
            <Grid container className="cl-tool-header">
                <Grid item xs={3} className="cl-tool-left">
                    <IconButton disabled={!prev} onClick={() => this.requestOfOtherMonthYear(-1)}>
                        <KeyboardArrowLeftRoundedIcon />
                    </IconButton>
                </Grid>
                <Grid item xs className="cl-tool-center cl-title">
                    <h2>{scheduleOfName}</h2>
                </Grid>
                <Grid item xs={3} className="cl-tool-right">
                    <IconButton disabled={!next} onClick={() => this.requestOfOtherMonthYear(1)}>
                        <KeyboardArrowRightRoundedIcon />
                    </IconButton>
                </Grid>
            </Grid>
        );
    }
}

export default MonthYearSetting;