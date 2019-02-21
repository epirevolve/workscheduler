import React from 'react'

import { connect } from 'react-redux'

import CalendarCell from '../components/CalendarCell'

import { openDialogToAppend } from '../actions'
import { openDialogToEdit } from '../actions'

const requestCalendar = ({ calendar, handleAppend, handleEdit }) => {
    const weeks = [];

    for (let [index1, week] of calendar.entries()) {
        let week_ = [];
        for (let [index2, day] of week.entries()) {
            week_.push(<CalendarCell key={`${index1}-${index2}`} day={day}
                handleAppend={handleAppend} handleEdit={handleEdit} />);
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

const mapStateToProps = (state) => ({
    calendar: state.calendar
})

const mapDispatchToProps = (dispatch) => ({
    handleAppend: (atFrom, atTo) => dispatch(openDialogToAppend(atFrom, atTo)),
    handleEdit: (request) => dispatch(openDialogToEdit(request))
})

export default connect(mapStateToProps, mapDispatchToProps)(requestCalendar)