import React from 'react'

import CalendarCell from './CalendarCell'

const requestCalendar = ({ requestCalendar, ...other }) => {
    const weeks = [];

    for (let [index1, week] of requestCalendar.entries()) {
        let week_ = [];
        for (let [index2, day] of week.entries()) {
            week_.push(<CalendarCell key={`${index1}-${index2}`} day={day} {...other} />);
        }
        weeks.push(<div key={`${index1}`} className="row">{week_}</div>);
    }

    return (
        <div className="col-md-10">
            <div className="cl">
                <div className="cl-header d-none d-md-block">
                    <div className="row">
                        <div className="cl-header-cell col text-danger">Sun</div>
                        <div className="cl-header-cell col">Mon</div>
                        <div className="cl-header-cell col">Tue</div>
                        <div className="cl-header-cell col">Wed</div>
                        <div className="cl-header-cell col">Thu</div>
                        <div className="cl-header-cell col">Fri</div>
                        <div className="cl-header-cell col text-info">Sat</div>
                    </div>
                </div>
                <div className="cl-body">
                    {weeks}
                </div>
            </div>
        </div>
    )
}

export default requestCalendar;