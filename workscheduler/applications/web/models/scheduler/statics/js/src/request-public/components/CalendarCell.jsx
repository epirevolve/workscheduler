import React from 'react'

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

import Request from './Request'

import { AlertManager } from 'alert-helper';

const dataset = document.querySelector('script[src*="request-public"]').dataset;
const scheduleOf = new Date(dataset.scheduleOf);

class CalendarCell extends React.Component {
    handleAppend (day, action) {
        if (day.requests.length >= 2) {
            const alertManager = new AlertManager('#alertContainer');
            alertManager.append('cant append more request on this day',
            'alert-danger');
            return;
        }

        const date = `${scheduleOf.getFullYear()}-${scheduleOf.getMonth() + 1}-${day.day}`;

        action(
            new Date(date + 'T09:30'),
            new Date(date + 'T18:00')
        );
    }

    render () {
        const { day, handleAppend, handleEdit, ...other } = this.props;

        if (!day)
            return <Grid item xs className="cl-body-cell"></Grid>;

        const requests = [];

        for (let request of day.requests) {
            if (request.operator.id != operatorId
                || (new Date(request.atFrom).getDate() != day.day && day.day != 1 && day.dayName != 'Sun'))
                continue;
            let from = new Date(request.atFrom);
            from.setDate(day.day);
            const to = new Date(request.atTo);
            let days = to.getDate() - from.getDate();
            if (days <= 7 && from.getDay() <= to.getDay()) {
            } else {
                days = 6 - from.getDay();
            }
            requests.push(<Request key={request.id} request={request} className={`day-${days + 1}`}
                handleEdit={() => handleEdit(request)} />)
        }

        return (
            <Grid item xs className="cl-body-cell">
                <React.Fragment>
                    <div>
                        <IconButton aria-label="Add Request" color="secondary" className="add-request"
                            onClick={() => this.handleAppend(day, handleAppend)}>
                            <EditRoundedIcon />
                        </IconButton>
                        <span className="cl-day">{day.day}</span>
                    </div>
                    <div className="request-container">
                        {requests}
                    </div>
                </React.Fragment>
            </Grid>
        );
    }
}

export default CalendarCell;