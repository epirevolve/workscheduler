import './request';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';

import DatePicker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import 'rc-calendar/assets/index';
import 'rc-time-picker/assets/index';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import moment from 'moment';

import { AlertManager } from 'alert-helper';

const communicator = {};

const $script = $('script[src*="request-public.min.js"]');

const calendar = $script.data('calendar');
const holidays = $script.data('holidays');
const paidHolidays = $script.data('paidHolidays');
const scheduleOf = new Date($script.data('scheduleOf'));
const urlAddRequest = $script.data('urlAddRequest');

function isValidRange(v) {
  return v && v[0] && v[1];
}

class RequestDialog extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            note: '',
            from: moment(),
            to: moment()
        }

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onNoteChange = this.onNoteChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);

        this.disabledDate = this.disabledDate.bind(this);
        this.handleToSave = this.handleToSave.bind(this);
    }

    componentWillMount () {
        communicator.openRequestDialogToEdit = (data) => {
            this.setState({
                id: data.id,
                title: data.title,
                note: data.note,
                from: moment(ata.from),
                to: moment(data.to)
            })

            this.openDialog();
        }

        communicator.openRequestDialogToAppend = (data) => {
            this.setState({
                id: '',
                title: '',
                note: '',
                from: moment(data.from),
                to: moment(data.to)
            })

            this.openDialog();
        }
    }

    openDialog () {
        $('#requestModal').modal();
    }

    onTitleChange (e) {
        this.setState({title: e.target.value});
    }

    onNoteChange (e) {
        this.setState({note: e.target.value});
    }

    onDateChange (date) {
        this.setState({from: date[0], to: date[1]});
    }

    disabledDate (current) {
        if (!current) {
            return false;
        }
        return current.valueOf() < minDate.valueOf() || maxDate.valueOf() < current.valueOf();
    }

    handleToSave (e) {
        const data = Object.assign(this.state,
            {from: this.state.from.toDate().toDateTimeFormatString(),
            to: this.state.to.toDate().toDateTimeFormatString()});
        const $postAction = () => {
            $.ajax({
                url: urlAddRequest,
                type: 'POST',
                data: data
            })
            .done((data) => {
                location.reload(true);
            })
            .fail(($xhr) => {
                const data = $xhr.responseJSON;
                const alertManager = new AlertManager('#alertContainer');
                const message = data.errorMessage || 'we have some trouble with appending request...';
                alertManager.append(`Oops, Sorry ${message}`,
                'alert-danger')
            });
        }

        if (holidays <= $('.request').length) {
            const message = paidHolidays <= 0 ? '<br><br>and also maybe your paid holidays are empty.' : '';
            showConfirmDialog('No Problem?', `adding more request will decrease your paid holidays.${message}`,
                (value) => {
                    if (!value) return;
                    $postAction();
                });
        }
        else {
            $postAction();
        }
    }

    render () {
        const timePickerElement = <TimePickerPanel defaultValue={moment('00:00', 'HH:mm')}
            showSecond={false} minuteStep={15} />;
        const calendar = <RangeCalendar showDateInput={false} disabledDate={this.disabledDate}
            timePicker={timePickerElement} showToday={false} format='YYYY-MM-DD HH:mm' />;
        return (
            <div className="modal fade" id="requestModal" tabIndex="-1" role="dialog"
                 aria-labelledby="requestLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Set your request</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group m-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">title</span>
                                </div>
                                <input type="text" className="form-control" onChange={this.onTitleChange} value={this.state.title} />
                            </div>
                            <div className="input-group m-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">note</span>
                                </div>
                                <textarea className="form-control" onChange={this.onNoteChange} value={this.state.note} />
                            </div>
                            <div className="form-group m-1">
                                <div className="input-group date" id="datetimeFrom">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">date</span>
                                    </div>
                                    <DatePicker animation="slide-up" calendar={calendar} style={{ zIndex: 1060 }}
                                        value={[this.state.from, this.state.to]} onChange={this.onDateChange} >
                                        { ({ value }) => {
                                            return (
                                                <input className="ant-calendar-picker-input ant-input form-control" readOnly tabIndex="-1"
                                                    value={isValidRange(value) && `${value[0].format('YYYY-MM-DD HH:mm')} - ${value[1].format('YYYY-MM-DD HH:mm')}` || ''} />);}}
                                    </DatePicker>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.handleToSave}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const RequestMinDialog = (props) => {
   return (
       <div>
            <button className='btn btn-info btn-sm btn-block mb-3'
                onClick={props.handleToEdit}>Edit</button>
            <div className='m-2'>{props.request.note}</div>
            <div className='m-2'>
                {props.request.from.toDateTimeFormatString()}<br />
                 ~<br />
                 {props.request.to.toDateTimeFormatString()}
            </div>
            <button className='btn btn-danger btn-sm btn-block mt-3'
                onClick={props.handleToRemove}>Remove</button>
        </div>
    );
};

class Request extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            id: props.request.id,
            title: props.request.title,
            note: props.request.note,
            from: new Date(props.request.at_from),
            to: new Date(props.request.at_to)
        }

        this.handleToEdit = this.handleToEdit.bind(this);
        this.handleToRemove = this.handleToRemove.bind(this);
    }

    render () {
        const title = ReactDOMServer.renderToStaticMarkup(<h4>{this.state.title}</h4>);
        const content = ReactDOMServer.renderToStaticMarkup(
            <RequestMinDialog request={this.state} handleToEdit={this.handleToEdit} handleToRemove={this.handleToRemove} />);
        return (
            <button className="btn request btn-block request-item"
                    title={title} type="button"
                    data-toggle="popover"
                    data-at-from={this.state.from.toYearMonthFormatString()}
                    data-at-to={this.state.to.toYearMonthFormatString()}
                    data-content={content}>
                { this.state.title }
            </button>
        )
    }

    handleToEdit (e) {
        communicator.openRequestDialogToEdit(this.state);
    }

    handleToRemove (e) {

    }
}

class CalendarCell extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            day: props.day ? props.day.day : '',
            requests: props.day ? props.day.requests : []
        }

        this.handleToAppend = this.handleToAppend.bind(this);
    }

    handleToAppend (e) {
        const $button = $(this);
        const $container = $button.parents('.cl-body-cell').eq(0);

        if ($container.find('.request-item').length >= 2) {
            const alertManager = new AlertManager('#alertContainer');
            alertManager.append('cant append more request on this day',
            'alert-danger');
            return;
        }

        const date = `${scheduleOf.getFullYear()}-${scheduleOf.getMonth() + 1}-${this.state.day}`;

        communicator.openRequestDialogToAppend({
            from: new Date(date + 'T09:30'),
            to: new Date(date + 'T18:00')
        });
    }

    render () {
        if (!this.state.day)
            return <div className="cl-body-cell col"></div>;

        const requests = [];

        for (let request of this.state.requests) {
            requests.push(<Request key={request.id} request={request} />)
        }

        return (
            <div className="cl-body-cell col">
                <React.Fragment>
                    <div>
                        <button className="add-request btn btn-danger btn-sm"
                            onClick={this.handleToAppend}>
                            <i className="fa fa-pencil-alt"></i>
                        </button>
                        <span className="cl-day">{ this.state.day }</span>
                    </div>
                    <div className="request-container">
                        { requests }
                    </div>
                </React.Fragment>
            </div>
        );
    }
}

class Calendar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            calendar: props.calendar
        }
    }

    render () {
        const weeks = [];

        for (let [index1, week] of this.state.calendar.entries()) {
            let week_ = [];
            for (let [index2, day] of week.entries()) {
                week_.push(<CalendarCell key={`${index1}-${index2}`} day={day} />);
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
                        { weeks }
                    </div>
                </div>
            </div>
        )
    }
}

const Content = (props) => {
    return (
        <div className="row">
            <Calendar calendar={props.calendar} />
            <div className="col-md-2">
                <div>
                    <h5>Monthly Holidays</h5>
                    <p>{ props.holidays } days</p>
                </div>
                <hr />
                <div>
                    <h5>Remained Paid Holidays</h5>
                    <p>{ props.paidHolidays  } days</p>
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(
    <RequestDialog />,
    document.getElementById('dialogContent')
);
ReactDOM.render(
    <Content calendar={calendar} holidays={holidays} paidHolidays={paidHolidays} />,
    document.getElementById('calendarContent')
);

$('[data-toggle="popover"]').popover(
{
    'html': true,
    'placement': 'top'
});