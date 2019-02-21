import React from 'react'

import Request from './Request'

const $script = $('script[src*="request-public.min.js"]');

const scheduleOf = new Date($script.data('scheduleOf'));

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
            return <div className="cl-body-cell col"></div>;

        const requests = [];

        for (let request of day.requests) {
            if (request.operator.id != operatorId || new Date(request.atFrom).getDate() != day.day)
                continue;
            requests.push(<Request key={request.id} request={request}
                handleEdit={() => handleEdit(request)} />)
        }

        return (
            <div className="cl-body-cell col">
                <React.Fragment>
                    <div>
                        <button className="add-request btn btn-danger btn-sm"
                            onClick={() => this.handleAppend(day, handleAppend)}>
                            <i className="fa fa-pencil-alt"></i>
                        </button>
                        <span className="cl-day">{day.day}</span>
                    </div>
                    <div className="request-container">
                        {requests}
                    </div>
                </React.Fragment>
            </div>
        );
    }
}

export default CalendarCell;