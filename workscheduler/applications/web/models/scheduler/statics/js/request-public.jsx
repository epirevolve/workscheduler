require('./request.jsx')
require('rc-calendar/assets/index.css')

const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = require('prop-types');

const RcCalendar = require('rc-calendar');
const DatePicker = require('rc-calendar/lib/Picker');
const moment = require('moment');

const communicator = {};

const $script = $('script[src*="request-public.min.js"]');

const calendar = $script.data('calendar');
const holidays = $script.data('holidays');
const paidHolidays = $script.data('paidHolidays');
const scheduleOf = new Date($script.data('scheduleOf'));

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
        this.onFromChange = this.onFromChange.bind(this);
        this.onToChange = this.onToChange.bind(this);

        this.disabledMinDate = this.disabledMinDate.bind(this);
    }

    componentWillMount () {
        communicator.openRequestDialogToEdit = (data) => {
            this.setState({
                id: data.id,
                title: data.title,
                note: data.note,
                from: data.from,
                to: data.to
            })

            this.openDialog();
        }

        communicator.openRequestDialogToAppend = (data) => {
            this.setState({
                id: '',
                title: '',
                note: '',
                from: moment(data.from),
                to: data.to
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

    onFromChange (e) {
        this.setState({from: e.date});
    }

    onToChange (e) {
        this.setState({to: e.date});
    }

    disabledMinDate (current) {
        if (!current) {
            return false;
        }
        return current.valueOf() < this.state.from
    }

    render () {
        const calendar = <RcCalendar
                            style={{ zIndex: 1000 }}
                            showDateInput={false} />
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
                                        <span className="input-group-text">from</span>
                                    </div>
                                    <DatePicker
                                        animation="slide-up" calendar={calendar}
                                        value={this.state.from} onChange={this.onFromChange}>
                                        {({ value }) => {
                                            return <input value={value ? value.format('YYYY-MM-DD HH:mm:ss') : ''} onChange={this.onFromChange} />;}}
                                    </DatePicker>
                                </div>
                            </div>
                            <div className="form-group m-1">
                                <div className="input-group date" id="datetimeTo" data-target-input="nearest">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">to</span>
                                    </div>
                                    <input type="text" className="form-control datetimepicker-input" data-target="#datetimeTo"
                                        value={this.state.to} onChange={this.onToChange} />
                                    <div className="input-group-append" data-target="#datetimeTo" data-toggle="datetimepicker">
                                        <div className="input-group-text"><i className="fa fa-calendar"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const requestMinDialog = (props) => {
   return (
       <div>
            <button className='btn btn-info btn-sm btn-block mb-3'
                onClick={props.onClickToEdit}>Edit</button>
            <div className='m-2'>{ props.note }</div>
            <div className='m-2'>
                { props.from } ~ { props.to }
            </div>
            <button className='btn btn-danger btn-sm btn-block mt-3'
                onClick={props.onClickToRemove}>Remove</button>
        </div>
    );
};

class Request extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            title: props.title,
            note: props.note,
            from: props.from,
            to: props.to
        }

        this.onClickToEdit = this.onClickToEdit.bind(this);
        this.onClickToRemove = this.onClickToRemove.bind(this);
    }

    render () {
        return (
            <button className="btn request btn-block request-item"
                    title="<h4>{ this.state.title }</h4>" type="button"
                    data-toggle="popover"
                    data-at-from={ this.state.from.toYearMonthFormatString() }
                    data-at-to={ this.state.to }
                    data-content={<RequestMinDialog note={this.state.note} from={this.state.from} to={this.state.to}
                        onClickToEdit={this.onClickToEdit} onClickToRemove={this.onClickToRemove} />}>
                { this.state.title }
            </button>
        )
    }

    onClickToEdit (e) {
        communicator.openRequestDialogToEdit(this.state);
    }

    onClickToRemove (e) {

    }
}

class CalendarCell extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            day: props.day ? props.day.day : '',
            requests: props.day ? props.day.requests : []
        }

        this.onClickToAppend = this.onClickToAppend.bind(this);
    }

    onClickToAppend (e) {
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
            from: new Date(date + 'T09:30').toDateTimeFormatString(),
            to: new Date(date + 'T18:00').toDateTimeFormatString()
        });
    }

    render () {
        if (!this.state.day)
            return <div className="cl-body-cell col"></div>;

        const requests = [];

        for (let request of this.state.requests) {
            requests.push(<Request key={request.id} />)
        }

        return (
            <div className="cl-body-cell col">
                <React.Fragment>
                    <div>
                        <button className="add-request btn btn-danger btn-sm"
                            onClick={this.onClickToAppend}>
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
        <div>
            <RequestDialog />

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